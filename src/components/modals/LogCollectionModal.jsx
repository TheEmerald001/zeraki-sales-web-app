import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectSchoolDetails } from "../../features/school/schoolSlice";
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
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { red } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  createCollection,
  updateInvoiceStatus,
} from "../../api/accounts/accounts";
import CustomSnackBar from "../utilities/CustomSnackBar";

function collectionName(name, channel) {
  function getInitials(name) {
    return name
      .split(" ")
      .filter((word) => word.length > 0)
      .map((word) => word[0].toUpperCase())
      .join("");
  }

  function getChannelCode(channel) {
    switch (channel) {
      case "Cash":
        return "CH";
      case "Bank Deposit":
        return "BD";
      case "Cheque":
        return "CQ";
      default:
        throw new Error("Invalid channel");
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
  const channelCode = getChannelCode(channel);
  const randomString = generateRandomString();
  const collectionNumber = `${initials}-${channelCode}-CLC-${randomString}`;

  return collectionNumber;
}

export default function LogCollectionModal({
  openCollectionModal,
  closeCollectionModal,
  invoiceDetails,
  updateInvoiceList,
}) {
  const [values, setValues] = useState({
    amount: "",
    channel: "",
    paymentType: "partial", // Default to partial
    snackbarMessage: "",
    openSnackbar: false,
    snackbarSeverity: "success",
  });

  const {
    amount,
    channel,
    paymentType,
    snackbarMessage,
    openSnackbar,
    snackbarSeverity,
  } = values;
  const channels = ["Cash", "Cheque", "Bank Deposit"];
  const schoolDetails = useSelector(selectSchoolDetails);

  const handleClose = () => {
    closeCollectionModal();
  };

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setValues({ ...values, openSnackbar: false });
  };

  const handleChange = (prop) => (event) => {
    const value = event.target.value;
    setValues((prevValues) => ({
      ...prevValues,
      [prop]: value,
      ...(prop === "paymentType" && value === "full"
        ? { amount: invoiceDetails.amount }
        : prop === "paymentType" && value === "partial"
          ? { amount: "" }
          : {}),
    }));
  };
  const updateInvoice = (paymentType, invoiceId) => {
    if (paymentType === "full") {
      updateInvoiceStatus("PAID UP", invoiceId);
    } else if (paymentType === "partial") {
      updateInvoiceStatus("ARREARS", invoiceId);
    }
  };
  const handleLogCollection = (e) => {
    e.preventDefault();
    let status = "valid";
    let collection_number = collectionName(schoolDetails.name, channel);
    return createCollection(
      amount,
      new Date(),
      channel,
      status,
      collection_number,
      invoiceDetails.invoice_number,
      schoolDetails.registration_number,
      schoolDetails.id,
      invoiceDetails.id
    )
      .then((res) => {
        if (res.status === 201) {
          setValues({
            amount: "",
            channel: "",
            paymentType: "partial",
            snackbarMessage: "Collection Logged Successfully",
            openSnackbar: true,
            snackbarSeverity: "success",
          });
          updateInvoiceList();
          updateInvoice(paymentType, invoiceDetails.id);

          setTimeout(() => {
            closeCollectionModal();
            setValues({
              amount: "",
              channel: "",
              paymentType: "partial",
              snackbarMessage: "",
              openSnackbar: flase,
              snackbarSeverity: "",
            });
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
        onClick={handleClose}
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
      open={openCollectionModal}
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
        <ValidatorForm autoComplete="off" onSubmit={handleLogCollection}>
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
                Log Invoice Collection Detail
              </Typography>
            </legend>

            <Grid xs={12} md={5} sx={{ m: 2 }}>
              <Box>
                <Typography sx={{ fontWeight: "700" }}>Payment Type</Typography>
                <RadioGroup
                  value={paymentType}
                  onChange={handleChange("paymentType")}
                >
                  <FormControlLabel
                    value="full"
                    control={<Radio />}
                    label="Full Payment"
                  />
                  <FormControlLabel
                    value="partial"
                    control={<Radio />}
                    label="Partial Payment"
                  />
                </RadioGroup>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: "700" }}>
                  Collection Amount
                </Typography>
                {invoiceDetails !== undefined && (
                  <TextValidator
                    fullWidth
                    type="number"
                    onChange={handleChange("amount")}
                    name="amount"
                    value={amount}
                    validators={[
                      "required",
                      `maxNumber:${invoiceDetails.amount}`,
                    ]}
                    errorMessages={[
                      "This Field is Required",
                      `Maximum amount is ${invoiceDetails.amount}`,
                    ]}
                    disabled={paymentType === "full"}
                  />
                )}
              </Box>
            </Grid>
            <Grid xs={12} md={5} sx={{ m: 2 }}>
              <Box>
                <Typography sx={{ fontWeight: "700" }}>
                  Collection Channel
                </Typography>
                <Select
                  fullWidth
                  labelId="channel-select-label"
                  value={channel}
                  onChange={handleChange("channel")}
                >
                  {channels.map((channel, index) => (
                    <MenuItem key={index} value={channel}>
                      {channel}
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
                  Log Collection
                </Button>
              </Box>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Card>
    </Dialog>
  );
}
