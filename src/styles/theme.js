import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#295FAB",
      lightest_tint: "#DEE8F7",
      lightest_gray: "#E0E5EB",
      darkest_gray: "#14191F",

      // SHADES
      darkest_shade: "#020508",

      // STATES
      hover: "#204984",
      disabled: "#C2CAD6",

      // CHARTS
      chart_green: "#1DB954", 
      chart_red: "#E50914",
      chart_gold: "#FFB200", 
    },

    secondary: {
      main: "#72BCD5",
      lightest_gray: "#E0E8EB",
      darkest_gray: "#141C1F",
      lightest_tint: "#E7F4F8",

      // SHADES
      darkest_shade: "#050D10",
    },
    error: {
      main: "#E50914",
    },
    // warning:{
    //   main: ""
    // },
    // info:{
    //   main: ""
    // },
    success: {
      main: "#1DB954",
      success_bg: "#E5FBEC",
    },
  },
  typography: {
    fontFamily: ["IBM Plex Sans"],
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    button: {
      textTransform: "none",
    },
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
  },
});

export default theme;