import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSchoolDetails } from "../../features/school/schoolSlice.js";
import CustomDataGrid from "../utilities/CustomDataGrid.jsx";
import {
  Card,
  Chip,
  Switch,
  useTheme,
  Typography,
  LinearProgress,
  IconButton,
  Box,
} from "@mui/material";
import { red, green } from "@mui/material/colors";

import moment from "moment";
import { getSchoolCollectionDetail } from "../../api/schools/schools.js";
import CollectionOverviewCard from "../display_cards/CollectionOverviewCard.jsx";
import {
  updateCollection,
  updateInvoiceStatus,
} from "../../api/accounts/accounts.js";

const CollectionsTable = ({ updateInvoiceList }) => {
  const schoolDetails = useSelector(selectSchoolDetails);
  const [schoolCollection, setSchoolCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCollections = () => {
    getSchoolCollectionDetail(schoolDetails.id).then((res) => {
      setSchoolCollection(res.data.collections);
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchCollections();
  }, []);

  function getChipProps(params) {
    if (params.value === "valid") {
      return {
        label: "VALID",
        style: {
          width: "200px",
          color: green[600],
          borderColor: green[100],
          backgroundColor: green[100],
          borderRadius: 5,
        },
      };
    } else {
      return {
        label: "BOUNCED",
        style: {
          width: "200px",
          color: red[600],
          borderColor: red[100],
          backgroundColor: red[100],
          borderRadius: 5,
        },
      };
    }
  }

  const handleMarkBounce = (collectionId, invoiceId) => {
    updateInvoiceStatus("INCOMPLETE", invoiceId).then((res) => {
      updateCollection("bounced", collectionId).then((res) => {
        fetchCollections();
      });
    });
  };

  const handleMarkValid = (collectionId, invoiceId) => {
    updateInvoiceStatus("PAID UP", invoiceId).then((res) => {
      updateCollection("valid", collectionId).then((res) => {
        fetchCollections();
      });
    });
  };

  const columns = [
    {
      field: "collection_number",
      headerName: "Collection No.",
      width: 150,
    },
    {
      field: "invoice_number",
      headerName: "Invoice Ref",
      width: 150,
    },
    {
      field: "school_reg",
      headerName: "School Reg",
      width: 100,
    },
    {
      field: "channel",
      headerName: "Method",
      width: 100,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 100,
    },
    {
      field: "date_updated",
      headerName: "Last Action",
      width: 150,
      renderCell: (params) => {
        return (
          <Typography>
            {moment(params.row.date_updated).format("DD/MM/YYYY")}
          </Typography>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
          <Chip variant="outlined" size="medium" {...getChipProps(params)} />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        const handleChange = () => {
          if (params.row.status === "valid") {
            handleMarkBounce(params.row.id, params.row.invoiceId);
          } else {
            handleMarkValid(params.row.id, params.row.invoiceId);
          }
        };

        return (
          <Switch
            checked={params.row.status === "valid"}
            onChange={handleChange}
            color={params.row.status === "valid" ? "success" : "error"}
            inputProps={{
              "aria-label":
                params.row.status === "valid" ? "mark bounced" : "mark valid",
            }}
          />
        );
      },
    },
  ];

  return (
    <Card sx={{ m: 2 }}>
      <Box
        display={{ xs: "none", md: "block" }}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            // backgroundColor: "primary.lightest_gray",
            fontSize: 16,
          },
        }}
      >
        {loading && <LinearProgress />}
        {!loading && (
          <CustomDataGrid rows={schoolCollection} columns={columns} />
        )}
      </Box>
      <Box
        display={{ xs: "block", md: "none" }}
        sx={{
          width: "100%",

          "& .MuiTab-root": {
            textTransform: "none",
            fontSize: "1rem",
          },
        }}
      >
        {schoolCollection.length > 0 &&
          schoolCollection.map((field, index) => {
            return (
              <CollectionOverviewCard
                collection={field}
                statusFunc={getChipProps}
              />
            );
          })}
      </Box>
    </Card>
  );
};

export default CollectionsTable;
