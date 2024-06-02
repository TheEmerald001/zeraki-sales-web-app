import React from "react";
import { Card, CardHeader, Typography, Box, Grid, Button } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CustomAvatar from "../utilities/CustomAvatar";
export default function SchoolInfoCard({ schoolDetail, menuOpen }) {
  return (
    <>
      <Card
        sx={{
          backgroundColor: "primary.lightest_tint",
          m: 1,
        }}
      >
        <CardHeader
          avatar={<CustomAvatar payload={schoolDetail} />}
          title={
            <Grid container sx={{ justifyContent: "space-between" }}>
              <Grid item>
                <Typography sx={{ p: 0, fontSize: 15, fontWeight: 600 }}>
                  {`${schoolDetail.name}`}{" "}
                </Typography>
              </Grid>
              <Grid item>
                {" "}
                <Typography sx={{ p: 0, fontSize: 11 }}>
                  {`${schoolDetail.location}, ${schoolDetail.country}`}{" "}
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
                <Typography sx={{ p: 0, fontSize: 11 }}>
                  {`${schoolDetail.school_type}`}{" "}
                </Typography>
              </Grid>
              <Grid item>
                <Box
                  display="flex"
                  alignItems="center"
                  textAlign="center"
                >
                  <Button
                    variant="outlined"
                    onClick={() => menuOpen(schoolDetail)}
                  >
                    <VisibilityOutlinedIcon
                      sx={{
                        color: `primary.main`,
                        mr: 1,
                        fontSize: "medium",
                      }}
                    />
                    View Details
                  </Button>
                </Box>
              </Grid>
            </Grid>
          }
        />
      </Card>
    </>
  );
}
