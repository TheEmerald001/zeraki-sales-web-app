import { getSchools } from "../../../api/schools/schools";
import { moduleAxios } from "../../../api/axios";

export const fetchCollections = async () => {
  let totalCollections = 0;
  let bouncedCheques = 0;
  let revenue = 0;

  try {
    const res = await moduleAxios.get(`/collections`);
    const collections = res.data;

    totalCollections = collections.length;
    bouncedCheques = collections.filter(
      (collection) => collection.status === "bounced"
    ).length;
    revenue = collections
      .filter((collection) => collection.status === "valid")
      .reduce((sum, collection) => sum + parseFloat(collection.amount), 0);
  } catch (error) {
    console.error("Failed to fetch collections:", error);
  }

  return { totalCollections, bouncedCheques, revenue };
};

export const totalSubscriptions = async () => {
  let totalSubscriptions = 0;
  try {
    const res = await getSchools();
    const schools = res.data;

    schools.forEach((school) => {
      totalSubscriptions += school.products.length;
    });
  } catch (error) {
    console.error("Failed to fetch schools:", error);
  }
  return totalSubscriptions;
};

export const targetMetrics = async () => {
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
    "Zeraki Finance": {
      primary: 0,
      secondary: 0,
      IGCSE: 0,
    },
    "Zeraki Analytics": {
      primary: 0,
      secondary: 0,
      IGCSE: 0,
    },
    "Zeraki Timetable": {
      primary: 0,
      secondary: 0,
      IGCSE: 0,
    },
  };
  try {
    const res = await getSchools();
    const schools = res.data;
    schools.forEach((school) => {
      if (school.products.includes("Zeraki Analytics")) {
        ZerakiAnalytics[0].value += 1;
        if (school.school_type === "PRIMARY") {
          signUpData["Zeraki Analytics"].primary += 1;
        } else if (school.school_type === "SECONDARY") {
          signUpData["Zeraki Analytics"].secondary += 1;
        } else if (school.school_type === "IGCSE") {
          signUpData["Zeraki Analytics"].IGCSE += 1;
        }
      }
      if (school.products.includes("Zeraki Finance")) {
        ZerakiFinance[0].value += 1;
        if (school.school_type === "PRIMARY") {
          signUpData["Zeraki Finance"].primary += 1;
        } else if (school.school_type === "SECONDARY") {
          signUpData["Zeraki Finance"].secondary += 1;
        } else if (school.school_type === "IGCSE") {
          signUpData["Zeraki Finance"].IGCSE += 1;
        }
      }
      if (school.products.includes("Zeraki Timetable")) {
        ZerakiTimetable[0].value += 1;
        if (school.school_type === "PRIMARY") {
          signUpData["Zeraki Timetable"].primary += 1;
        } else if (school.school_type === "SECONDARY") {
          signUpData["Zeraki Timetable"].secondary += 1;
        } else if (school.school_type === "IGCSE") {
          signUpData["Zeraki Timetable"].IGCSE += 1;
        }
      }
    });
  } catch (err) {
    console.log("Error Fetching Schools", err);
  }

  return { ZerakiAnalytics, ZerakiFinance, ZerakiTimetable, signUpData };
};

export const dueInvoices =  async () => {
  let invoiceList = [];
  try {
    const res = await moduleAxios.get(`/invoices`);
    const invoices = res.data;
    // implement time base sorting and return top 5
    invoices.sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
    invoiceList = invoices.slice(0, 10);
  } catch (error) {
    console.error("Failed to fetch invoices:", error);
  }

  return invoiceList;
};