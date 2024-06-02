import React, { useState } from "react";
import DashTable from "../../utilities/DashTable.jsx";
import { Chip, Card, Typography, Button } from "@mui/material";
import { red, green } from "@mui/material/colors";
import moment from "moment";
import QuickCollectModal from "./QuickCollectModal.jsx";
function getChipProps(value) {
  const today = new Date();
  let isActive;

  // Check if the value is a date in the format "YYYY-MM-DD"
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (datePattern.test(value)) {
    const dateValue = new Date(value);
    isActive = dateValue >= today;
  } else {
    isActive = value === "ACTIVE";
  }

  if (isActive) {
    return {
      label: "ACTIVE",
      style: {
        width: "100px",
        color: green[600],
        borderColor: green[100],
        backgroundColor: green[100],
        borderRadius: 5,
      },
    };
  } else {
    return {
      label: "OVERDUE",
      style: {
        width: "100px",
        color: red[600],
        borderColor: red[100],
        backgroundColor: red[100],
        borderRadius: 5,
      },
    };
  }
}

const DueInvoicesTable = ({ invoiceData, triggerReload, reload}) => {
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState({});
  const closeCollectionModal = () => {
    setOpenCollectionModal(false);
  };
  const handleCollectionClick = (params) => {
    setInvoiceDetails(params);
    setOpenCollectionModal(true);
  };
  const columns = [
    {
      field: "schoolName",
      headerName: "School",
      width: 150,
    },
    {
      field: "amount",
      headerName: "Amount Due",
      width: 150,
      renderCell: (params) => {
        return <Typography>Kes. {params.row.amount}</Typography>;
      },
    },
    {
      field: "due_date",
      headerName: "Due Date",
      width: 150,
      renderCell: (params) => {
        return (
          <Typography>
            {moment(params.row.due_date).format("DD/MM/YYYY")}
          </Typography>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        return (
          <Chip
            variant="outlined"
            size="medium"
            {...getChipProps(params.row.due_date)}
          />
        );
      },
    },
    {
      field: "product",
      headerName: "Product",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Quick Action",
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            variant="outlined"
            onClick={() => handleCollectionClick(params.row)}
          >
            Make Collection
          </Button>
        );
      },
    },
  ];

  return (
    <Card>
      <QuickCollectModal
        openCollectionModal={openCollectionModal}
        closeCollectionModal={closeCollectionModal}
        invoiceDetails={invoiceDetails}
        triggerReload={triggerReload}
        reload={reload}
      />
      <Typography variant="h6" sx={{ ml: 2, fontWeight: "600" }}>
        {" "}
        Upcoming Invoices
      </Typography>
      <DashTable rows={invoiceData} columns={columns} />
    </Card>
  );
};

export default DueInvoicesTable;
