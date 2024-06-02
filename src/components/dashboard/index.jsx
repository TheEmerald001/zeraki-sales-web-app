import React, { useEffect, useState } from "react";
import MetricCard from "./cards/MetricCard";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import PaidIcon from "@mui/icons-material/Paid";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import CallMissedOutgoingIcon from "@mui/icons-material/CallMissedOutgoing";
import { Box, Grid } from "@mui/material";
import TargetsChart from "./charts/TargetsChart";
import ProductSignUpChart from "./charts/ProductSignUpChart";
import DueInvoicesTable from "./tables/DueInvoicesTable";
import { fetchCollections, totalSubscriptions, targetMetrics, dueInvoices } from "./data/data";

const AgentDashboard = () => {
  const [collections, setCollections] = useState({
    totalCollections: "...",
    bouncedCheques: "...",
    revenue: "...",
  });
  const [subscriptions, setSubscriptions] = useState("...");
  const [products, setProducts] = useState({
    ZerakiAnalytics: [],
    ZerakiFinance: [],
    ZerakiTimetable: [],
  });
  const [signUpData, setSignUpData] = useState({
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
  })
  const [invoiceData, setInvoiceData] = useState([])
  const [reload, setReload] = useState(false)
  const reloadPage = () => {
    setReload(!reload)
  }
  useEffect(() => {
    const fetchAndSetCollections = async () => {
      const result = await fetchCollections();
      setCollections(result);
    };
    const fetchAndSetSubscriptions = async () => {
      const result = await totalSubscriptions();
      setSubscriptions(result);
    };
    const fetchAndSetTargets = async () => {
      const result = await targetMetrics();
      setProducts(result);
      setSignUpData(result.signUpData)
    };
    const fetchAndSetInvoices = async () => {
      const result = await dueInvoices();
      setInvoiceData(result);
    };

    fetchAndSetCollections();
    fetchAndSetSubscriptions();
    fetchAndSetTargets();
    fetchAndSetInvoices();
  }, [reload]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon={<LibraryAddCheckIcon sx={{ color: "primary.main" }} />}
            text={"Collections"}
            number={collections.totalCollections}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon={<SubscriptionsIcon sx={{ color: "primary.main" }} />}
            text={"Sign Ups"}
            number={subscriptions}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon={<PaidIcon sx={{ color: "primary.main" }} />}
            text={"Revenue"}
            number={collections.revenue}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            icon={<CallMissedOutgoingIcon sx={{ color: "primary.main" }} />}
            text={"Bounced Cheques"}
            number={collections.bouncedCheques}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
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
          <ProductSignUpChart signUpData ={signUpData }/>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={9} sx={{ mt: -8 }}>
          <DueInvoicesTable invoiceData={invoiceData} triggerReload={reloadPage} reload={reload}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AgentDashboard;
