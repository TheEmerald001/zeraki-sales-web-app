import React, { useState } from "react";
import { selectSchoolInvoices } from "../../features/school/schoolSlice.js";
import { useSelector } from "react-redux";
import CustomDataGrid from "../utilities/CustomDataGrid.jsx";
import {
  Menu,
  Chip,
  MenuItem,
  IconButton,
  useTheme,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
import { red, green, blue, yellow } from "@mui/material/colors";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessAlarmsOutlinedIcon from "@mui/icons-material/AccessAlarmsOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import moment from "moment";
import EditSchoolInvoice from "../modals/EditSchoolInvoice.jsx";
import InvoiceOverviewCard from "../display_cards/InvoiceOverviewCard.jsx";
import DeleteInvoiceModal from "../modals/DeleteInvoiceModal.jsx";
import LogCollectionModal from "../modals/LogCollectionModal.jsx";

function getChipProps(value) {
  const today = new Date();
  let isActive;

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
        width: "150px",
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
        width: "150px",
        color: red[600],
        borderColor: red[100],
        backgroundColor: red[100],
        borderRadius: 5,
      },
    };
  }
}

const InvoicesTable = ({updateInvoiceList}) => {
  const invoiceRowData = useSelector(selectSchoolInvoices);
  const [rowParams, setRowParams] = useState();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [openEditInvoiceDialog, setOpenEditInvoiceDialog] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCollectionModal, setOpenCollectionModal] = useState(false)
  const theme = useTheme();

  const closeEditInvoiceDialog = () => {
    setOpenEditInvoiceDialog(false);
  };
  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  const closeCollectionModal = () => {
    setOpenCollectionModal(false);
  };

  const handleInvoiceActionsClick = (params) => (event) => {
    setRowParams(params.row);
    setAnchorElNav(event.currentTarget);
  };

  const handleInvoiceActionsMobile = (params) => (event) => {
    setRowParams(params);
    setAnchorElNav(true);
  };

  const handleCloseMenu = () => {
    setAnchorElNav(null);
  };

  const handleEditInvoice = () => {
    handleCloseMenu();
    setOpenEditInvoiceDialog(true);
  };
  const handleDeleteInvoice = () => {
    handleCloseMenu();
    setOpenDeleteModal(true);
  };
  const handleLogCollection = () => {
    handleCloseMenu();
    setOpenCollectionModal(true);
  }
  const getStatusColor = (status) => {
    switch (status) {
      case "INCOMPLETE":
        return red[500];
      case "PAID UP":
        return green[500];
      case "ARREARS":
        return yellow[700];
        case "UNPAID":
        return blue[700];
      default:
        return "inherit";
    }
  };

  const columns = [
    {
      field: "invoice_number",
      headerName: "Invoice Number",
      width: 150,
    },
    {
      field: "amount",
      headerName: "Amount",
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
      field: "status",
      headerName: "Payment",
      width: 150,
      renderCell: (params) => {
        return (
          <Typography style={{ color: getStatusColor(params.value) }}>
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <IconButton onClick={handleInvoiceActionsClick(params)}>
            <MoreVertIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box sx={{ m: 2 }}>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => handleEditInvoice()}>
          <Box display="flex" alignItems="center" textAlign="center">
            <EditNoteIcon
              sx={{
                color: `${theme.palette.primary.main}`,
                mr: 1,
                fontSize: "medium",
              }}
            />
            Edit Invoice
          </Box>
        </MenuItem>
        <MenuItem onClick={() => handleLogCollection()}>
          <Box display="flex" alignItems="center" textAlign="center">
            <AttachMoneyIcon
              sx={{
                color: "primary.main",
                mr: 1,
                fontSize: "medium",
              }}
            />
            Log a Collection
          </Box>
        </MenuItem>
        <MenuItem onClick={() => handleDeleteInvoice()}>
          <Box display="flex" alignItems="center" textAlign="center">
            <DeleteForeverIcon
              sx={{
                color: `${theme.palette.error.main}`,
                mr: 1,
                fontSize: "medium",
              }}
            />
            Delete Invoice
          </Box>
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          {" "}
          <Box display="flex" alignItems="center" textAlign="center">
            <LocalPrintshopOutlinedIcon
              sx={{
                color: `${theme.palette.primary.main}`,
                mr: 1,
                fontSize: "medium",
              }}
            />
            Print Invoice
          </Box>
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          {" "}
          <Box display="flex" alignItems="center" textAlign="center">
            <AccessAlarmsOutlinedIcon
              sx={{
                color: `${theme.palette.primary.main}`,
                mr: 1,
                fontSize: "medium",
              }}
            />
            Send Reminder
          </Box>
        </MenuItem>
      </Menu>
      <EditSchoolInvoice
        openInvoiceDialog={openEditInvoiceDialog}
        closeInvoiceDialog={closeEditInvoiceDialog}
        invoiceDetails={rowParams}
        updateInvoiceList={updateInvoiceList}
      />
      <DeleteInvoiceModal
        openDeleteModal={openDeleteModal}
        closeDeleteModal={closeDeleteModal}
        invoiceDetails={rowParams}
        updateInvoiceList={updateInvoiceList}
      />
      <LogCollectionModal
        openCollectionModal={openCollectionModal}
        closeCollectionModal={closeCollectionModal}
        invoiceDetails={rowParams}
        updateInvoiceList={updateInvoiceList}
      />

      <Box
        display={{ xs: "none", md: "block" }}
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "primary.lightest_gray",
            fontSize: 16,
          },
        }}
      >
        <CustomDataGrid rows={invoiceRowData} columns={columns} />
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
        {invoiceRowData.length > 0 &&
          invoiceRowData.map((field, index) => {
            return (
              <InvoiceOverviewCard
                key={index}
                InvoiceDetail={field}
                menuOpen={handleInvoiceActionsMobile(field)}
                statusFunc={getChipProps}
              />
            );
          })}
      </Box>
    </Box>
  );
};

export default InvoicesTable;
