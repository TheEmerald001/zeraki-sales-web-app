import React from "react";
import { Card, Chip, CardHeader, Typography, Box, Grid } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
export default function InvoiceOverviewCard({
  InvoiceDetail,
  menuOpen,
  statusFunc,
}) {
  return (
    <>
      <Card
        sx={{
          backgroundColor: "primary.lightest_tint",
          m: 1,
        }}
      >
        <CardHeader
          title={
            <Grid container sx={{ justifyContent: "space-between" }}>
              <Grid item>
                <Typography sx={{ p: 0, fontSize: 15, fontWeight: 600 }}>
                  {`INV: ${InvoiceDetail.invoice_number}`}{" "}
                </Typography>
              </Grid>
              <Grid item>
                {
                  <Chip
                    variant="outlined"
                    size="small"
                    {...statusFunc(InvoiceDetail.due_date)}
                  />
                }
              </Grid>
            </Grid>
          }
          subheader={
            <Grid
              container
              sx={{ justifyContent: "space-between", flexWrap: "nowrap" }}
            >
              <Grid item>
                <Typography>
                  {`Kes. ${InvoiceDetail.amount}`}
                </Typography>
              </Grid>
              <Grid item>
                <Box
                  display="flex"
                  alignItems="center"
                  textAlign="center"
                  onClick={() => menuOpen(InvoiceDetail)}
                >
                  <MoreHorizIcon
                    sx={{
                      color: `error.main`,
                      mr: 1,
                      fontSize: "medium",
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          }
        />
      </Card>
    </>
  );
}
