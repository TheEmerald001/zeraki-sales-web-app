import React from "react";
import { Card, Chip, CardHeader, Typography, Button, Grid } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
export default function CollectionOverviewCard({ collection, statusFunc }) {
  return (
    
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
                  {`CLC: ${collection.collection_number}`}{" "}
                </Typography>
              </Grid>
              <Grid item>
              <Typography sx={{ p: 0, fontSize: 15, fontWeight: 600 }}>
                  {`${collection.status}`}{" "}
                </Typography>
              </Grid>
            </Grid>
          }
          subheader={
            <Grid
              container
              sx={{ justifyContent: "space-between", flexWrap: "nowrap" }}
            >
              <Grid item>
                <Typography>{`Kes. ${collection.amount}`}</Typography>
              </Grid>
              <Grid item>
                <Button
                  display="flex"
                  alignItems="center"
                  textAlign="center"
                  onClick={() => menuOpen(InvoiceDetail)}
                >
                  Mark Boumced
                </Button>
              </Grid>
            </Grid>
          }
        />
      </Card>
    
  );
}
