import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/user/userSlice.js";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import {
  Drawer,
  Tabs,
  Tab,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Tooltip,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { store } from "../../store/store.js";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Zeraki_Logo from "../../images/Zeraki_Logo.png";
import Person_Avatar from "../../images/Person_Avatar.png";
import UserAccountModal from "../modals/UserAccountModal.jsx";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import SchoolIcon from "@mui/icons-material/School";
import UserAppBar from "./UserAppBar.jsx";
const pages = [
  {
    label: "Dashboard",
    icon: <DashboardCustomizeOutlinedIcon sx={{ mr: 2 }} fontSize="small" />,
    value: "dashboard",
  },
  {
    label: "Schools",
    icon: <SchoolIcon sx={{ mr: 2 }} fontSize="small" />,
    value: "schools",
  },
];
const NavigationBar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openUserAccountModal, setOpenUserAccountModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [open, setState] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pathnameArray = location.pathname.split("/");
  const user = useSelector(selectCurrentUser);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  //function that is being called every time the drawer should open or close, the keys tab and shift are excluded so the user can focus between the elements with the keys
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    //changes the function state according to the value of open
    setState(open);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserAccount = () => {
    setAnchorElUser(null);
    setOpenUserAccountModal(true);
  };

  const closeUserAccountModal = () => {
    setOpenUserAccountModal(false);
  };

  const logOut = () => {
    return {
      type: "USER_LOGOUT",
    };
  };
  const handleLogOut = () => {
    store.dispatch(logOut());
  };

  useEffect(() => {
    if (pathnameArray[2] === undefined || pathnameArray[2] === "dashboard") {
      setSelectedTab("dashboard");
    } else {
      setSelectedTab(pathnameArray[2]);
    }
  }, [pathnameArray]);

  return (
    <Box sx={{ display: "flex" }}>
      {/* DISPLAY SIDE BAR ON LARGE AND MEDIUM SCREENS */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
            backgroundColor: "#295FAB",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
        }}
        open
      >
        <Toolbar
          sx={{
            backgroundColor: "#fff",
            p: 2,
          }}
        >
          <Box
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            component={Link}
            to={"/sales/dashboard"}
          >
            <img
              alt="Zeraki"
              src={Zeraki_Logo}
              style={{
                width: "150px",
                height: "30px",
                marginRight: "20px",
              }}
            />
          </Box>
        </Toolbar>
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          <Tabs
            orientation="vertical"
            value={selectedTab}
            onChange={handleChange}
            TabIndicatorProps={{ hidden: true }}
            sx={{
              "& button": {
                justifyContent: "flex-start",
                color: "white",
                fontSize: "1rem",
                textTransform: "none",
                padding: 3,
              },
              "& button.Mui-selected": {
                color: "white",
                border: " 1px solid white",
                borderRadius: "5px",
                margin: 2,
              },
            }}
          >
            {pages.map((page) => {
              return (
                <Tab
                  key={page.value}
                  value={page.value}
                  onClick={() => navigate(`${page.value}`)}
                  label={
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      {page.icon || null}
                      <Typography>{page.label}</Typography>
                    </div>
                  }
                />
              );
            })}
          </Tabs>
        </Box>
        <Toolbar
          sx={{
            backgroundColor: "#fff",
            maxHeight: 20,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Tooltip title="Log Out">
              <IconButton onClick={handleLogOut} sx={{ color: "black", p: 0 }}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="My Profile">
              <IconButton
                onClick={handleUserAccount}
                sx={{ color: "black", p: 0 }}
              >
                <Person2OutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </Drawer>
      {/* DISPLAY HAMBURGER MENU ON SMALL SCREENS */}
      <AppBar
        position="fixed"
        sx={{
          display: { xs: "block", md: "none" },
          backgroundColor: "#295FAB",
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            m: 2,
          }}
        >
          <Box>
            <IconButton
              size="large"
              aria-label="open drawer"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Drawer
            anchor="bottom"
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <List
              onChange={handleChange}
              onClick={toggleDrawer(false)}
              sx={{
                backgroundColor: "primary.main",
              }}
            >
              {pages.map((page) => (
                <ListItem
                  key={page.value}
                  value={page.value}
                  onClick={() => navigate(`${page.value}`)}
                  sx={{ color: "white" }}
                  disablePadding
                >
                  <ListItemButton color={"white"}>
                    <ListItemIcon>{page.icon || null}</ListItemIcon>
                    <ListItemText>{page.label}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>

          <Box
            component={Link}
            to={"/sales/dashboard"}
            sx={{
              display: { xs: "flex", md: "none" },
            }}
          >
            <img
              alt="Zeraki"
              src={Zeraki_Logo}
              style={{
                width: "150px",
                height: "30px",
                justify: "center",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title="My Profile">
              <IconButton onClick={handleUserAccount}>
                <Avatar alt="S-Admin" src={Person_Avatar} />
              </IconButton>
            </Tooltip>
            <Box sx={{ mr: 1, textAlign: "right" }}>
              <Typography
                sx={{ fontSize: "1rem", fontWeight: 400, color: "white" }}
              >
                {user.user_name}
              </Typography>
              <Typography
                sx={{ fontSize: "0.9rem", fontWeight: 200, color: "white" }}
              >
                Sales
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <UserAccountModal
        openUserAccountModal={openUserAccountModal}
        closeUserAccountModal={closeUserAccountModal}
      />
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          flexGrow: 1,
          flexDirection: "column",
          width: { md: `calc(100% - 240px)` },
          ml: { md: "240px" },
        }}
      >
        <UserAppBar />
        <Box sx={{ mt: 13, flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>

      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          p: 1,
          mt: 11,
          ml: -2,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
export default NavigationBar;
