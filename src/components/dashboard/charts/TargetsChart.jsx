import React from "react";
import Chart from "react-apexcharts";
import { Box, Card, Typography } from "@mui/material";

function TargetsChart({ productStatics, heading }) {
  return (
    <Card sx={{  padding: 2, margin: 1 }}>
        <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h6" fontWeight="600">
          {heading}
        </Typography>
      </Box>
      <Chart
        type="pie"
        width="100%"
        height="400"
        series={productStatics.map((statistic) => statistic.value)}
        options={{
          labels: productStatics.map((statistic) => statistic.name),
          colors: ["#295FAB", "#5c940d"],
          dataLabels: {
            enabled: true,
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 0.2,
              opacityFrom: 0.6,
              opacityTo: 0.9,
            },
          },

          plotOptions: {
            pie: {
              expandOnClick: true,
            },
          },
          chart: {
            toolbar: {
              show: false,
            },
          },
          tooltip: {
            style: {
              fontSize: 10,
              fontFamily: "Mulish",
            },
          },

          legend: {
            position: "bottom",
            verticalAlign: "center",
            horizontalAlign: "left",
            fontSize: "14",
            fontWeight: 400,
            fontFamily: "IBM Plex Sans",
            formatter: function (seriesName, opts) {
              return [
                seriesName,
                // " - ",
                // `${opts.w.globals.series[opts.seriesIndex]}% Vol.`,
              ];
            },

            containerMargin: {
              left: 35,
              right: 60,
            },
          },
        }}
      ></Chart>
    </Card>
  );
}

export default TargetsChart;
