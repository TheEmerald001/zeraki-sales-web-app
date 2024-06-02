import React, { useState } from "react";
import {
  Modal,
  Stack,
  Box,
  IconButton,
  Icon,
  Typography,
  Button,
} from "@mui/material";
import CustomSnackBar from "../utilities/CustomSnackBar";
import { deleteInvoice } from "../../api/accounts/accounts";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";

const DeleteInvoiceModal = ({
  openDeleteModal,
  closeDeleteModal,
  invoiceDetails,
  updateInvoiceList,
}) => {
  const handleClose = () => {
    closeDeleteModal();
  };

  const [values, setValues] = useState({
    snackbarMessage: "",
    openSnackbar: false,
    snackbarSeverity: "success",
  });
  const { reason, snackbarMessage, openSnackbar, snackbarSeverity } = values;

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setValues({ ...values, openSnackbar: false });
  };

  const handleDelete = () => {
    return deleteInvoice(invoiceDetails.id)
      .then((res) => {
        if (res.status === 200) {
          setValues({
            ...values,
            snackbarMessage: "Invoice Deleted Successfully!",
            openSnackbar: true,
            snackbarSeverity: "success",
          });
          setTimeout(() => {
            updateInvoiceList();
            handleClose();
            setValues({
              ...values,
              snackbarMessage: "",
              openSnackbar: false,
              snackbarSeverity: "",
            });
          }, 1000);
        } else {
          setValues({
            ...values,
            snackbarMessage: res.data.message,
            openSnackbar: true,
            snackbarSeverity: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setValues({
          ...values,
          snackbarMessage: err.message,
          openSnackbar: true,
          snackbarSeverity: "error",
        });
      });
  };

  return (
    <Modal open={openDeleteModal} onClose={handleClose}>
      <Stack
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "auto",
          bgcolor: "background.paper",
          border: 2,
          borderRadius: 2,
          borderColor: `primary.main`,
          elevation: 24,
          p: 2,
        }}
      >
        {" "}
        <CustomSnackBar
          openSnackbar={openSnackbar}
          handleClose={closeSnackbar}
          snackbarMessage={snackbarMessage}
          snackbarSeverity={snackbarSeverity}
        />
        <Stack alignItems="flex-end" justifyContent="flex-end">
          <IconButton onClick={handleClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Stack>
        <Stack alignItems="center">
          <Box
            justifyContent="center"
            sx={{
              width: "95%",
              height: 250,
            }}
          >
            <Box display="flex" justifyContent="center">
              {" "}
              <Icon
                fontSize="large"
                sx={{
                  width: 60,
                  height: 60,
                  border: 7,
                  borderRadius: "60%",
                  borderColor: `error.main`,
                }}
              >
                <PriorityHighOutlinedIcon
                  sx={{
                    width: 60,
                    height: 60,
                    color: `error.main`,
                  }}
                />
              </Icon>
            </Box>

            <Stack sx={{ textAlign: "center" }}>
              <Typography variant="h5" fontWeight="600">
                You are about to delete this invoice
              </Typography>
            </Stack>

            <Stack textAlign="center" sx={{ mt: 1 }}>
              <Typography fontWeight="400">
                Deleting the invoice will remove it from company records and all
                its associated payments.
              </Typography>
            </Stack>
          </Box>
        </Stack>
        <Stack direction="row">
          {" "}
          <Button
            sx={{ width: 120, borderRadius: 2, mr: 2 }}
            onClick={handleClose}
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            sx={{
              width: 120,
              borderRadius: 2,
              color: "error.main",
              borderColor: "error.main",
            }}
            onClick={handleDelete}
            variant="outlined"
          >
            DELETE.
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default DeleteInvoiceModal;
