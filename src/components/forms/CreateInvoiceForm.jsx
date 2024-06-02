import React, { useState } from "react";
import {
  Box,
  Select,
  Typography,
  Button,
  MenuItem,
  Grid,
} from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import moment from "moment";

// custom components
import CustomSnackBar from "../utilities/CustomSnackBar";
import DatePicker from "../utilities/DatePicker";
import { createInvoice } from "../../api/accounts/accounts";

function invoiceNumber(name, product) {
  function getInitials(name) {
      return name
        .split(' ')
        .filter(word => word.length > 0)
        .map(word => word[0].toUpperCase())
        .join('');
    }

function getProductCode(product) {
  switch (product) {
    case "Zeraki Analytics":
      return "ZA";
    case "Zeraki Finance":
      return "ZF";
    case "Zeraki Timetable":
      return "ZT";
    default:
      throw new Error("Invalid product");
  }
}

function generateRandomString() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const initials = getInitials(name);
const productCode = getProductCode(product);
const randomString = generateRandomString();
const invoiceNumber = `${initials}-${productCode}-INV-${randomString}`;

return invoiceNumber;
}

const CreateInvoiceForm = ({
  schoolId,
  updateInvoiceList,
  closeCreationForm,
  schoolName
}) => {
  const [values, setValues] = useState({
    due_date: "",
    amount: "",
    product: "",

    snackbarMessage: "",
    openSnackbar: false,
    snackbarSeverity: "success",
  });

  const {
    due_date,
    amount,
    product,

    snackbarMessage,
    openSnackbar,
    snackbarSeverity,
  } = values;
  const products = ["Zeraki Analytics", "Zeraki Finance", "Zeraki Timetable"];

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handlePayDateChange = (date) => {
    setValues({ ...values, due_date: date });
  };

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setValues({ ...values, openSnackbar: false });
  };

  const handleCreateInvoice = (e) => {
    e.preventDefault();

    return createInvoice(
      invoiceNumber(schoolName, product),
      moment(due_date.$d).format("YYYY-MM-DD"),
      amount,
      product,
      schoolId,
      schoolName
    )
      .then((res) => {
        if (res.status === 201) {
          setValues({
            due_date: "",
            amount: "",
            product: "",
            snackbarMessage: "Invoice Created Successfully",
            openSnackbar: true,
            snackbarSeverity: "success",
          });
          updateInvoiceList();
          setTimeout(() => {
            closeCreationForm();
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

  return (
    <>
      <Box sx={{ m: 2 }}>
        {" "}
        <CustomSnackBar
          openSnackbar={openSnackbar}
          handleClose={closeSnackbar}
          snackbarMessage={snackbarMessage}
          snackbarSeverity={snackbarSeverity}
        />
        <ValidatorForm
          autoComplete="off"
          onSubmit={(e) => handleCreateInvoice(e)}
        >
          <Grid container spacing={1}>
            <Grid
              container
              xs={12}
              component="fieldset"
              sx={{
                border: "solid 3px #295FAB",
                borderRadius: "15px",
                padding: (theme) => theme.spacing(2),
                marginBottom: "15px",
              }}
            >
              <legend>
                <Typography sx={{ fontWeight: "600", color: "#295FAB" }}>
                  Create Invoice
                </Typography>
              </legend>
              <Grid xs={12} md={5} sx={{ m: 2 }}>
                
                <Box >
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
              </Grid>
              <Grid xs={12} md={5} sx={{ m: 2 }}>
                <Box>
                  <Typography sx={{ fontWeight: "700" }}>
                    Date Payable
                  </Typography>
                  <DatePicker handleDateChange={handlePayDateChange} />
                </Box>{" "}
                
                <Box sx={{ mt: 6 }}>
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
                    Create Invoive
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Grid xs={2}></Grid>
          </Grid>
        </ValidatorForm>
      </Box>
    </>
  );
};

export default CreateInvoiceForm;
