import React, { useEffect, useState } from "react";

import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Stack, Container, Box, Tabs, Tab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SchoolIcon from "@mui/icons-material/School";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
// Functions
import { getSchools } from "../../api/schools/schools.js";
const SchoolsNav = ({ homepage }) => {
  const [selectedTab, setSelectedTab] = React.useState("all-schools");
  const [schoolsNumber, setSchoolsNumber] = useState("");

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const navigate = useNavigate();
  const location = useLocation();
  const pathnameArray = location.pathname.split("/");

  useEffect(() => {
    if (pathnameArray[3] === undefined) {
      setSelectedTab("all-schools");
    } else if (pathnameArray[3] === "new-school") {
      setSelectedTab("add-school");
    } else {
      setSelectedTab(pathnameArray[3]);
    }
  }, [pathnameArray]);

  useEffect(() => {
    getSchools().then((res) => {
      setSchoolsNumber(res.data.length);
    });
  });
  return (
    <Container maxWidth="xl">
      <Box>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          TabIndicatorProps={{ hidden: true }}
          variant="scrollable"
          sx={{
            "	&.MuiTabs-root": {},
            "& button": {
              width: 200,
              marginRight: 0,
              color: "primary.main",
              backgroundColor: "primary.lightest_tint",
              fontSize: "1rem",
            },
            "& button.Mui-selected": {
              color: "white",
              backgroundColor: "primary.main",
            },
          }}
        >
          <Tab
            value="all-schools"
            icon={<SchoolIcon fontSize="small" />}
            iconPosition="start"
            onClick={() => navigate(`/${homepage}/schools`)}
            label={`All Schools (${schoolsNumber})`}
          />
          {selectedTab === "view" && (
            <Tab
              icon={<AdminPanelSettingsIcon fontSize="small" />}
              iconPosition="start"
              value="view"
              label="Management"
            />
          )}
          <Tab
            icon={<AddIcon fontSize="small" />}
            iconPosition="start"
            value="enrol"
            onClick={() => navigate("enrol")}
            label="Enrol School"
          />
        </Tabs>
      </Box>
      <Box sx={{ bgcolor: "background.paper" }}>
        <Outlet />
      </Box>
    </Container>
  );
};

export default SchoolsNav;
