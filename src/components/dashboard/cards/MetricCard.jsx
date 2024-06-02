import React from "react";
import { Card, Typography, Icon, Box } from "@mui/material";

const MetricCard = ({ icon, text, number }) => {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, margin: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 2 }}>
        <Icon>
          {icon}
        </Icon>
      </Box>
      <Box>
        <Typography variant="h6" fontWeight="700">
          {number}
        </Typography>
        <Typography  fontWeight="400">
          {text}
        </Typography>
      </Box>
    </Card>
  );
};

export default MetricCard;
