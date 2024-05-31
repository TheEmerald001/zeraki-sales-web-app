import React from "react";

import { Box, Typography, Link } from "@mui/material";
export default function Copyright() {
  return (
    <Box sx={{ position: "fixed", bottom: 0, width: "100%", display: "flex", justifyContent: "center" }}>
      <Typography
        variant="body2"
        color="white"
        align="center"
      >
        {"© Copyright "}
        <Link color="#295FAB" href="https://zeraki.app/">
          Zeraki Learning
        </Link>{" "}
        {new Date().getFullYear()}
        {". All Rights Reserved."}
      </Typography>
    </Box>
  );
}
