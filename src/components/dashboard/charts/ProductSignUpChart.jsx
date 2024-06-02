import React from "react";
import Chart from "react-apexcharts";
import { Card, Box, Typography } from "@mui/material";

const ProductSignUpChart = ({ heading, signUpData }) => {
  const transformedData = {
    categories: [],
    series: [
      { name: "Primary", data: [] },
      { name: "Secondary", data: [] },
      { name: "IGCSE", data: [] },
    ],
  };

  Object.entries(signUpData).forEach(([key, values]) => {
    transformedData.categories.push(key);
    transformedData.series[0].data.push(values.primary);
    transformedData.series[1].data.push(values.secondary);
    transformedData.series[2].data.push(values.IGCSE);
  });

  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: transformedData.categories,
    },
    yaxis: {
      title: {
        text: "Number of Sign Ups",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
    colors: ["#295FAB", "#5c940d", "#f9c802"],
  };

  return (
    <Card sx={{ padding: 2, margin: 1 }}>
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" fontWeight="700">
          Product By School Type
        </Typography>
      </Box>
      <Chart
        options={options}
        series={transformedData.series}
        type="bar"
        height={350}
      />
    </Card>
  );
};

export default ProductSignUpChart;
