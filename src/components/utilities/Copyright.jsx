import React from "react";

import { Box, Typography, Link } from "@mui/material";
export default function Copyright() {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        mt: 2,
        backgroundColor: "azure"
      }}
      component="footer"
    >
      <Typography variant="body2" color="black" align="center">
        {"©  "} {new Date().getFullYear()}{" "}
        
        <Link color="#295FAB" href="https://zeraki.app/">
          Zeraki Learning
        </Link>{". "}
        {"All Rights Reserved."}
      </Typography>
    </Box>
  );
}
