import { getSchools } from "../../../api/schools/schools";
import { moduleAxios } from "../../../api/axios";
import { setSchoolsList } from "../../../features/school/schoolSlice";

export const fetchDashboardData = async (dispatch, setDashboardData) => {
  try {
    const [collectionsRes, schoolsRes, invoicesRes] = await Promise.all([
      moduleAxios.get(`/collections`),
      getSchools(),
      moduleAxios.get(`/invoices`),
    ]);

    const collections = collectionsRes.data;
    const schools = schoolsRes.data;
    const invoices = invoicesRes.data;

    // Process collections
    const totalCollections = collections.length;
    const bouncedCheques = collections.filter(
      (collection) => collection.status === "bounced"
    ).length;
    const revenue = collections
      .filter((collection) => collection.status === "valid")
      .reduce((sum, collection) => sum + parseFloat(collection.amount), 0);

    const collectionsData = { totalCollections, bouncedCheques, revenue };

    // Process subscriptions and targets
    let totalSubscriptions = 0;
    let ZerakiAnalytics = [
      { name: "Current Signups", value: 0 },
      { name: "Target signups", value: 70 },
    ];
    let ZerakiFinance = [
      { name: "Current Signups", value: 0 },
      { name: "Target signups", value: 90 },
    ];
    let ZerakiTimetable = [
      { name: "Current Signups", value: 0 },
      { name: "Target signups", value: 80 },
    ];
    const signUpData = {
      "Zeraki Finance": { primary: 0, secondary: 0, IGCSE: 0 },
      "Zeraki Analytics": { primary: 0, secondary: 0, IGCSE: 0 },
      "Zeraki Timetable": { primary: 0, secondary: 0, IGCSE: 0 },
    };

    schools.forEach((school) => {
      totalSubscriptions += school.products.length;
      school.products.forEach((product) => {
        if (product === "Zeraki Analytics") {
          ZerakiAnalytics[0].value += 1;
          signUpData["Zeraki Analytics"][school.school_type.toLowerCase()] += 1;
        }
        if (product === "Zeraki Finance") {
          ZerakiFinance[0].value += 1;
          signUpData["Zeraki Finance"][school.school_type.toLowerCase()] += 1;
        }
        if (product === "Zeraki Timetable") {
          ZerakiTimetable[0].value += 1;
          signUpData["Zeraki Timetable"][school.school_type.toLowerCase()] += 1;
        }
      });
    });

    dispatch(setSchoolsList({ schoolsList: schools }));

    const productsData = { ZerakiAnalytics, ZerakiFinance, ZerakiTimetable };

    // Process invoices
    invoices.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
    const invoiceData = invoices.slice(0, 10);

    let data = {
      collections: collectionsData,
      subscriptions: totalSubscriptions,
      products: productsData,
      signUpData,
      invoiceData,
    };
    setDashboardData(data)
    return true
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return {
      collections: { totalCollections: "N/A", bouncedCheques: "N/A", revenue: "N/A" },
      subscriptions: "N/A",
      products: { ZerakiAnalytics: [], ZerakiFinance: [], ZerakiTimetable: [] },
      signUpData: {
        "Zeraki Finance": { primary: "N/A", secondary: "N/A", IGCSE: "N/A" },
        "Zeraki Analytics": { primary: "N/A", secondary: "N/A", IGCSE: "N/A" },
        "Zeraki Timetable": { primary: "N/A", secondary: "N/A", IGCSE: "N/A" },
      },
      invoiceData: [],
    };
  }
};
