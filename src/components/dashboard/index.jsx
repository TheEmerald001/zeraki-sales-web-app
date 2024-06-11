import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MetricCard from "./cards/MetricCard";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import PaidIcon from "@mui/icons-material/Paid";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import CallMissedOutgoingIcon from "@mui/icons-material/CallMissedOutgoing";
import { Box, Grid } from "@mui/material";
import TargetsChart from "./charts/TargetsChart";
import ProductSignUpChart from "./charts/ProductSignUpChart";
import DueInvoicesTable from "./tables/DueInvoicesTable";
import { fetchDashboardData } from "./data/data";
import { moduleAxios } from "../../api/axios";

const AgentDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    collections: { totalCollections: "...", bouncedCheques: "...", revenue: "..." },
    subscriptions: "...",
    products: { ZerakiAnalytics: [], ZerakiFinance: [], ZerakiTimetable: [] },
    signUpData: {
      "Zeraki Finance": { primary: 0, secondary: 0, IGCSE: 0 },
      "Zeraki Analytics": { primary: 0, secondary: 0, IGCSE: 0 },
      "Zeraki Timetable": { primary: 0, secondary: 0, IGCSE: 0 },
    },
    invoiceData: []
  });
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();

  const reloadPage = () => {
    setReload(!reload);
  };

  useEffect(() => {
    fetchDashboardData(dispatch, setDashboardData);
  }, []);

  const { collections, subscriptions, products, signUpData, invoiceData } = dashboardData;

  return (
    <div className="dashcomp">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container sx={{ m: 1 }}>
          <Grid item xs={6} sm={6} md={3}>
            <MetricCard
              icon={<LibraryAddCheckIcon sx={{ color: "primary.main" }} />}
              text={"Collections"}
              number={collections.totalCollections}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <MetricCard
              icon={<SubscriptionsIcon sx={{ color: "primary.main" }} />}
              text={"Sign Ups"}
              number={subscriptions}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <MetricCard
              icon={<PaidIcon sx={{ color: "primary.main" }} />}
              text={"Revenue"}
              number={collections.revenue}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <MetricCard
              icon={<CallMissedOutgoingIcon sx={{ color: "primary.main" }} />}
              text={"Bounced"}
              number={collections.bouncedCheques}
            />
          </Grid>
        </Grid>
        <Grid container sx={{ m: 1 }}>
          <Grid item xs={12} sm={6} md={3}>
            <TargetsChart
              productStatics={products.ZerakiAnalytics}
              heading={"Zeraki Analytics"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TargetsChart
              productStatics={products.ZerakiTimetable}
              heading={"Zeraki TimeTable"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TargetsChart
              productStatics={products.ZerakiFinance}
              heading={"Zeraki Finance"}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ProductSignUpChart signUpData={signUpData} />
          </Grid>
        </Grid>
        <div className="invoiceTable">
          <Grid container sx={{ m: 1 }}>
            <Grid item xs={12} sm={6} md={9} sx={{ mt: -6 }}>
              <DueInvoicesTable
                invoiceData={invoiceData}
                triggerReload={reloadPage}
                reload={reload}
              />
            </Grid>
          </Grid>
        </div>
      </Box>
    </div>
  );
};

export default AgentDashboard;
