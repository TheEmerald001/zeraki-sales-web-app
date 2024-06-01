import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  LinearProgress,
  Chip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { red, green } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import BlockIcon from "@mui/icons-material/Block";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AddIcon from "@mui/icons-material/Add";
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
      label: params.value,
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
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [schoolsData, setSchoolsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rowParams, setRowParams] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleCloseMenu = () => {
    setAnchorElNav(null);
  };
  const handleSchoolActionsClick = (params) => (event) => {
    setRowParams(params.row);
    setAnchorElNav(event.currentTarget);
  };
  const handleSchoolActionsMobile = (params) => (event) => {
    setRowParams(params);
    setAnchorElNav(true);
  };

  const handleMenuItemClick = (prop) => {
    handleCloseMenu();
    dispatch(setSchoolDetails({ schoolDetails: rowParams }));
    navigate(prop, {
      state: {
        rowParams,
      },
    });
  };

  const fetchSchools = () => {
    setLoading(true);
    getSchools().then((res) => {
    //   const activeSchools = res.data.filter(
    //     (school) => school.status !== "DEACTIVATED"
    //   );
      setSchoolsData(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchSchools();
  }, []);
  const OnboardedSchoolsActions = () => {
    return (
      <>
        
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseMenu}
        >
          
          <MenuItem onClick={() => handleMenuItemClick("view")}>
            <Box display="flex" alignItems="center" textAlign="center">
              <VisibilityOutlinedIcon
                sx={{
                  color: `primary.main`,
                  mr: 1,
                  fontSize: "medium",
                }}
              />
              View Details
            </Box>
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("invoics")}>
            <Box display="flex" alignItems="center" textAlign="center">
              <AddIcon
                sx={{
                  color: `primary.main`,
                  mr: 1,
                  fontSize: "medium",
                }}
              />
              Invoices
            </Box>
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("colections")}>
            <Box display="flex" alignItems="center" textAlign="center">
              <UploadFileIcon
                sx={{
                  color: `primary.main`,
                  mr: 1,
                  fontSize: "medium",
                }}
              />
              Collections
            </Box>
          </MenuItem>
        </Menu>{" "}
      </>
    );
  };

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
      headerName: "Registration Number ",
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
      type: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <IconButton onClick={handleSchoolActionsClick(params)}>
              <MoreVertIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Typography variant="h6" sx={{ ml: 2 }}>
        View Onboarded Schools
      </Typography>
      <Box
        display={{ xs: "none", md: "block" }}
        sx={{
          mt: 5,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "primary.lightest_gray",
            fontSize: 16,
          },
        }}
      >
        <OnboardedSchoolsActions />
        {loading && <LinearProgress />}
        {!loading && <CustomDataGrid rows={schoolsData} columns={columns} />}
      </Box>
      <Box
        display={{ xs: "block", md: "none" }}
        sx={{
          width: "100%",
          mt: 3,

          "& .MuiTab-root": {
            textTransform: "none",
            fontSize: "1rem",
          },
        }}
      >
        {loading && <LinearProgress />}
        {schoolsData.length > 0 &&
          schoolsData.map((field, index) => {
            return (
              <SchoolInfoCard
                key={index}
                // code={field.code}
                schoolDetail={field}
                menuOpen={handleSchoolActionsMobile(field)}
              />
            );
          })}
      </Box>
    </>
  );
};

export default OnboardedSchoolsTable;
