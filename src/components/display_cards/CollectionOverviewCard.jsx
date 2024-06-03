import React from "react";
import {
  Card,
  CardHeader,
  Typography,
  Chip,
  Grid,
  Switch,
} from "@mui/material";
export default function CollectionOverviewCard({
  collection,
  statusFunc,
  handleMarkBounce,
  handleMarkValid,
}) {
  const renderSwitch = (status, id, invoiceId) => {
    const handleChange = () => {
      if (status === "valid") {
        handleMarkBounce(id, invoiceId);
      } else {
        handleMarkValid(id, invoiceId);
      }
    };

    return (
      <Switch
        checked={status === "valid"}
        onChange={handleChange}
        color={status === "valid" ? "success" : "error"}
        inputProps={{
          "aria-label": status === "valid" ? "mark bounced" : "mark valid",
        }}
      />
    );
  };
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
                {collection.status}
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
              {renderSwitch(
                collection.status,
                collection.id,
                collection.invoiceId
              )}
            </Grid>
          </Grid>
        }
      />
    </Card>
  );
}
