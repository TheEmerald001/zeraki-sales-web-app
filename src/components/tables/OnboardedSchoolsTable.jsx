import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Avatar,
  Button,
  Menu,
  MenuItem,
  Box,
  LinearProgress,
  Chip,
} from "@mui/material";
import { red, green } from "@mui/material/colors";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CustomDataGrid from "../utilities/CustomDataGrid";

// Functions
import { getSchools } from "../../api/schools/schools.js";
import { setSchoolDetails } from "../../features/school/schoolSlice.js";
import SchoolInfoCard from "../display_cards/SchoolInfoCard.jsx";

function getChipProps(params) {
  if (params.value === "ACTIVE") {
    return {
      label: params.value,
      style: {
        width: "200px",
        color: green[600],
        borderColor: green[100],
        backgroundColor: green[100],
        borderRadius: 5,
      },
    };
  } else {
    return {
      label: "DEACTIVATED",
      style: {
        width: "200px",
        color: red[600],
        borderColor: red[100],
        backgroundColor: red[100],
        borderRadius: 5,
      },
    };
  }
}

const OnboardedSchoolsTable = () => {
  const [schoolsData, setSchoolsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSchoolActionsClick = (params) => {
    dispatch(setSchoolDetails({ schoolDetails: params.row }));
    navigate("view");
  };
  const handleSchoolActionsMobile = (params)  => {
    dispatch(setSchoolDetails({ schoolDetails: params }));
    navigate("view");
  };


  const fetchSchools = () => {
    setLoading(true);
    getSchools().then((res) => {
      setSchoolsData(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchSchools();
  }, []);
 

  const columns = [
    {
      field: "name",
      headerName: "School Name",
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <Avatar sx={{ mr: 2 }} src={params.value} alt={params.value} />
            {params.value}
          </>
        );
      },
    },
    {
      field: "country",
      headerName: "Country",
      width: 100,
    },
    {
      field: "location",
      headerName: "County ",
      width: 160,
    },
    {
      field: "school_type",
      headerName: "Level",
      width: 160,
    },
    {
      field: "registration_number",
      headerName: "Registration No. ",
      width: 160,
    },

    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        return (
          <Chip variant="outlined" size="medium" {...getChipProps(params)} />
        );
      },
    },
    {
      field: "actions",
      headerName: "Quick Action",
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            variant="outlined"
            onClick={() => handleSchoolActionsClick(params)}
          >
            <VisibilityOutlinedIcon
              sx={{
                color: `primary.main`,
                mr: 1,
                fontSize: "medium",
              }}
            />
            View Details
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Typography variant="h6" fontWeight={600}>
        Onboarded Schools
      </Typography>
      <Box
        display={{ xs: "none", md: "block" }}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "primary.lightest_gray",
            fontSize: 16,
          },
        }}
      >
        {loading && <LinearProgress />}
        {!loading && <CustomDataGrid rows={schoolsData} columns={columns} />}
      </Box>
      <Box
        display={{ xs: "block", md: "none" }}
        sx={{
          // width: "100%",
          // mt: 1,

          // "& .MuiTab-root": {
          //   textTransform: "none",
          //   fontSize: "1rem",
          // },
        }}
      >
        {loading && <LinearProgress />}
        {schoolsData.length > 0 &&
          schoolsData.map((field, index) => {
            return (
              <SchoolInfoCard
                key={index}
                schoolDetail={field}
                menuOpen={handleSchoolActionsMobile}
              />
            );
          })}
      </Box>
    </>
  );
};

export default OnboardedSchoolsTable;
