import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardHeader,
  MenuItem,
  Typography,
  Dialog,
  Button,
  Select,
} from "@mui/material";
import { red } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DatePicker from "../utilities/DatePicker";
import { updateInvoice } from "../../api/accounts/accounts";
import CustomSnackBar from "../utilities/CustomSnackBar";
import moment from "moment";

export default function EditSchoolInvoice({
  openInvoiceDialog,
  closeInvoiceDialog,
  invoiceDetails,
  updateInvoiceList,
}) {
  const [values, setValues] = useState({
    invoice_number: "",
    due_date: "",
    amount: "",
    product: "",

    snackbarMessage: "",
    openSnackbar: false,
    snackbarSeverity: "success",
  });
  const products = ["Zeraki Analytics", "Zeraki Finance", "Zeraki Timetable"];

  const {
    invoice_number,
    due_date,
    amount,
    product,

    snackbarMessage,
    openSnackbar,
    snackbarSeverity,
  } = values;
  const handleClose = () => {
    closeInvoiceDialog();
  };
  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setValues({ ...values, openSnackbar: false });
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handlePayDateChange = (date) => {
    setValues({ ...values, due_date: date });
  };
  useEffect(() => {
    if (invoiceDetails !== undefined) {
      setValues(invoiceDetails);
    }
  }, [invoiceDetails]);

  const handleEditInvoice = (e) => {
    e.preventDefault();
    return updateInvoice(
      invoice_number,
      moment(due_date.$d).format("YYYY-MM-DD"),
      amount,
      product,
      invoiceDetails.id
    )
      .then((res) => {
        if (res.status === 200) {
          setValues({
            invoice_number: "",
            due_date: "",
            amount: "",
            product: "",
            snackbarMessage: "Invoice Updated Successfully",
            openSnackbar: true,
            snackbarSeverity: "success",
          });
          updateInvoiceList();
          setTimeout(() => {
            closeInvoiceDialog();
          }, 1000);
        } else {
          setValues({
            ...values,
            snackbarMessage: res.data.errors[0].detail,
            openSnackbar: true,
            snackbarSeverity: "error",
          });
        }
      })
      .catch((err) => {
        setValues({
          ...values,
          snackbarMessage: err.response.data.errors[0].detail,
          openSnackbar: true,
          snackbarSeverity: "error",
        });
      });
  };

  const closeButton = () => {
    return (
      <Button
        type="submit"
        variant="outlined"
        color="error"
        onClick={() => handleClose()}
      >
        <Box display="flex" alignItems="center" textAlign="center">
          <CloseIcon
            sx={{
              color: red[500],
              mr: 1,
              fontSize: "medium",
            }}
          />
          <span
            style={{
              color: red[500],
            }}
          >
            Close
          </span>
        </Box>
      </Button>
    );
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      open={openInvoiceDialog}
      onClose={handleClose}
    >
      <CustomSnackBar
        openSnackbar={openSnackbar}
        handleClose={closeSnackbar}
        snackbarMessage={snackbarMessage}
        snackbarSeverity={snackbarSeverity}
      />
      <Card sx={{ m: 2 }}>
        <CardHeader action={closeButton()} />
        <ValidatorForm
          autoComplete="off"
          onSubmit={(e) => handleEditInvoice(e)}
        >
          <Grid
            container
            xs={11}
            component="fieldset"
            sx={{
              border: "solid 3px #295FAB",
              borderRadius: "15px",
              padding: (theme) => theme.spacing(1),
              margin: "15px",
            }}
          >
            <legend>
              <Typography sx={{ fontWeight: "600", color: "#295FAB" }}>
                Update School Invoice
              </Typography>
            </legend>
            <Grid xs={12} md={5} sx={{ m: 2 }}>
              <Box>
                {" "}
                <Typography sx={{ fontWeight: "700" }}>
                  Invoice Number
                </Typography>
                <TextValidator
                  fullWidth
                  onChange={handleChange("invoice_number")}
                  name="invoice_number"
                  value={invoice_number}
                  validators={["required"]}
                  errorMessages={["This Field is Required"]}
                />
              </Box>{" "}
              <Box sx={{ mt: 2 }}>
                {" "}
                <Typography sx={{ fontWeight: "700" }}>
                  Invoice Amount
                </Typography>
                <TextValidator
                  fullWidth
                  type="number"
                  onChange={handleChange("amount")}
                  name="amount"
                  value={amount}
                  validators={["required"]}
                  errorMessages={["This Field is Required"]}
                />
              </Box>{" "}
            </Grid>
            <Grid xs={12} md={5} sx={{ m: 2 }}>
              <Box>
                <Typography sx={{ fontWeight: "700" }}>Date Payable</Typography>
                <DatePicker handleDateChange={handlePayDateChange} />
              </Box>{" "}
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: "700" }}>
                  Invoice Product
                </Typography>
                <Select
                  fullWidth
                  labelId="product-select-label"
                  value={product}
                  onChange={handleChange("product")}
                  label="Product"
                >
                  {products.map((product, index) => (
                    <MenuItem key={index} value={product}>
                      {product}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Button
                  sx={{
                    color: "white",
                    bgcolor: "green",
                    fontSize: "1rem",
                  }}
                  type="submit"
                  variant="contained"
                  disableElevation
                >
                  Edit Invoice Details
                </Button>
              </Box>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Card>
    </Dialog>
  );
}
