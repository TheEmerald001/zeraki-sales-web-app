import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSchoolDetails,
  setSchoolInvoices,
  setSchoolCollections,
} from "../../features/school/schoolSlice.js";
import {
  Box,
  Chip,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  Grid,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import moment from "moment";
import countries from "countries-list";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InvoiceCard from "./InvoiceCard.jsx";
import CollectionsTable from "../tables/CollectionsTable.jsx";
import FinanceCard from "./FinanceCard.jsx";
import {
  getSchoolInvoiceDetail,
  getSchoolCollectionDetail,
} from "../../api/schools/schools.js";
const SchoolDetails = () => {
  const schoolDetails = useSelector(selectSchoolDetails);
  const [userAction, setUserAction] = useState("view");
  const dispatch = useDispatch();

  const fetchStoreInvoices = () => {
    getSchoolInvoiceDetail(schoolDetails.id).then((res) => {
      dispatch(setSchoolInvoices({ schoolInvoices: res.data.invoices }));
    });
  };

  const fetchStoreCollections = () => {
    getSchoolCollectionDetail(schoolDetails.id).then((res) => {
      dispatch(
        setSchoolCollections({ schoolCollections: res.data.collections })
      );
    });
  };
  useEffect(() => {
    fetchStoreInvoices();
    fetchStoreCollections();
  }, []);

  const handleTabChange = (event, newValue) => {
    setUserAction(newValue);
  };
  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }

  return (
    <Grid container sx={{ m: 1 }}>
      <Grid>
        {" "}
        <Box
          sx={{
            backgroundColor: "primary.lightest_tint",
            p: 2,
          }}
        >
          <Box sx={{ mb: 1 }}>
            <Tabs value={userAction} onChange={handleTabChange}>
              <Tab
                label={<Typography fontWeight="600">View</Typography>}
                value="view"
                sx={{ mr: 1 }}
              />
              <Tab
                value="invoice"
                label={<Typography fontWeight="600">Invoices</Typography>}
              />
              <Tab
                value="collection"
                label={<Typography fontWeight="600">Collections</Typography>}
                sx={{ mr: 1 }}
              />
              <Tab
                value="finance"
                label={<Typography fontWeight="600">Finance</Typography>}
              />
            </Tabs>
          </Box>
          {userAction === "view" && (
            <Card>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: red[500] }}
                    {...stringAvatar(schoolDetails.name)}
                    aria-label="recipe"
                  />
                }
                title={schoolDetails.name}
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                subheader={
                  <Chip
                    label={schoolDetails.school_type}
                    color="info"
                    variant="outlined"
                    size="small"
                  />
                }
              />

              <CardContent>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <Grid item>
                    <Typography>Country:</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{`${countries.countries[schoolDetails.country]?.name} ${countries.getEmojiFlag(schoolDetails.country)}`}</Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <Grid item>
                    <Typography>County:</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{`${schoolDetails.location}`} </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <Grid item>
                    <Typography>Registration Number:</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      {`${schoolDetails.registration_number}`}{" "}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <Grid item>
                    <Typography>Date Onboarded:</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      {moment(schoolDetails.date_enrolled).format(
                        "Do MMMM YYYY [at] h:mmA"
                      )}
                    </Typography>
                  </Grid>
                </Grid>
                {schoolDetails.products &&
                  schoolDetails.products.length > 0 &&
                  schoolDetails.products.map((product) => {
                    return (
                      <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mb: 1 }}
                      >
                        <Grid item>
                          <Typography>{product}:</Typography>
                        </Grid>
                        <Grid item>
                          <CheckCircleOutlineIcon color="success" />
                        </Grid>
                      </Grid>
                    );
                  })}
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography>Status:</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>
                      {
                        <Chip
                          label={schoolDetails.status}
                          color="success"
                          variant="outlined"
                        />
                      }
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
          {userAction === "invoice" && <InvoiceCard />}
          {userAction === "collection" && <CollectionsTable />}
          {userAction === "finance" && <FinanceCard />}
        </Box>
      </Grid>
    </Grid>
  );
};

export default SchoolDetails;
