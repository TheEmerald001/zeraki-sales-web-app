import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  TextField,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Grid,
  Autocomplete,
} from "@mui/material";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

// Custom Components
import CountrySelect from "../utilities/CountrySelect";

// Functions
import { createSchool } from "../../api/schools/schools";
import CustomSnackBar from "../utilities/CustomSnackBar";

const CreateSchoolForm = () => {
  const [values, setValues] = useState({
    name: "",
    school_type: "",
    location: "",
    registration_number: "",
    country: "",
    date_enrolled: "",
    contact: "",

    snackbarMessage: "",
    openSnackbar: false,
    snackbarSeverity: "success",
  });
  const {
    name,
    registration_number,
    school_type,
    location,
    contact,

    snackbarMessage,
    openSnackbar,
    snackbarSeverity,
  } = values;
  const products = ["Zeraki Analytics", "Zeraki Finance", "Zeraki Timetable"];
  const [selectedProducts, setSelectedProducts] = useState([]);
  const handleProductChange = (event, value) => {
    setSelectedProducts(value);
  };
  const [country, setCountry] = useState("");
  const navigate = useNavigate();
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setValues({ ...values, openSnackbar: false });
  };

  const handleCreateSchool = (e) => {
    e.preventDefault();
    const schoolDetails = {
      name: name,
      school_type: school_type,
      location: location,
      registration_number: registration_number,
      country: country.code,
      date_enrolled: new Date(),
      contact: contact,
      products: selectedProducts,
      status: "ACTIVE"
    };
    if (name && registration_number && country) {
      return createSchool(schoolDetails)
        .then((res) => {
          if (res.status === 201) {
            setValues({
              name: "",
              school_type: "",
              location: "",
              registration_number: "",
              country: "",
              date_started: "",
              snackbarMessage: "School Created Successfully",
              openSnackbar: true,
              snackbarSeverity: "success",
            });
            setTimeout(() => {
              navigate("/sales/schools");
            }, 2000);
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
    }
  };

  return (
    <>
      <Box sx={{ pt: 2 }}>
        {" "}
        <CustomSnackBar
          openSnackbar={openSnackbar}
          handleClose={closeSnackbar}
          snackbarMessage={snackbarMessage}
          snackbarSeverity={snackbarSeverity}
        />
        <ValidatorForm
          autoComplete="off"
          onSubmit={(e) => handleCreateSchool(e)}
        >
          <Grid container>
            <Grid
              container
              xs={12}
              component="fieldset"
              sx={{
                border: "solid 3px #295FAB",
                borderRadius: "15px",
                padding: (theme) => theme.spacing(1),
                marginBottom: "10px",
              }}
            >
              <legend>
                <Typography sx={{ fontWeight: "600", color: "#295FAB" }}>
                  School Details
                </Typography>
              </legend>
              <Grid xs={10} md={5} sx={{ m: 2 }}>
                <Box>
                  {" "}
                  <Typography sx={{ fontWeight: "500" }}>
                    School Name
                  </Typography>
                  <TextValidator
                    fullWidth
                    onChange={handleChange("name")}
                    name="name"
                    value={name}
                    validators={["required"]}
                    errorMessages={["This Field is Required"]}
                  />
                </Box>{" "}
                <Box sx={{ mt: 2 }}>
                  {" "}
                  <Typography sx={{ fontWeight: "500" }}>
                    Institution Level
                  </Typography>
                  <Select
                    placeholder="e.g 1, 2, 3, etc"
                    fullWidth
                    value={school_type}
                    onChange={handleChange("school_type")}
                  >
                    <MenuItem value="PRIMARY">Primary</MenuItem>
                    <MenuItem value="JUNIOR_SECONDARY">
                      Junior Secondary
                    </MenuItem>
                    <MenuItem value="SECONDARY">Secondary</MenuItem>
                    <MenuItem value="HIGH">IGCSE</MenuItem>
                  </Select>
                </Box>
                <Box sx={{ mt: 2 }}>
                  {" "}
                  <Typography sx={{ fontWeight: "500" }}>
                    School Registration No
                  </Typography>
                  <TextValidator
                    fullWidth
                    onChange={handleChange("registration_number")}
                    name="registration_number"
                    value={registration_number}
                    validators={["required"]}
                    errorMessages={["This Field is Required"]}
                  />
                </Box>
                <Box display={{ xs: "none", md: "block" }}>
                  {" "}
                  <Button
                    onClick={handleCreateSchool}
                    sx={{
                      mt: 5,
                      color: "white",
                      bgcolor: "green",
                      fontSize: "1rem",
                    }}
                    type="submit"
                    variant="contained"
                    disableElevation
                  >
                    Create school
                  </Button>
                </Box>
              </Grid>
              <Grid xs={10} md={5} sx={{ m: 2 }}>
                <Box>
                  {" "}
                  <Typography sx={{ fontWeight: "500" }}>Country</Typography>
                  <CountrySelect setCountry={setCountry} />
                </Box>{" "}
                <Box sx={{ mt: 2 }}>
                  {" "}
                  <Typography sx={{ fontWeight: "500" }}>
                    Region/County
                  </Typography>
                  <TextField
                    fullWidth
                    value={location}
                    onChange={handleChange("location")}
                  ></TextField>
                </Box>
                <Box sx={{ mt: 2 }}>
                  {" "}
                  <Typography sx={{ fontWeight: "500" }}>
                    Email/Phone Number
                  </Typography>
                  <TextField
                    fullWidth
                    value={contact}
                    onChange={handleChange("contact")}
                  ></TextField>
                </Box>
                <Box sx={{ mt: 2 }}>
                
                <Autocomplete
                  multiple
                  options={products}
                  fullWidth
                  disableCloseOnSelect
                  value={selectedProducts}
                  onChange={handleProductChange}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox style={{ marginRight: 8 }} checked={selected} />
                      <ListItemText primary={option} />
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Zeraki Products"
                    />
                  )}
                />
                </Box>
              </Grid>
              <Box display={{ xs: "block", md: "none" }}>
                <Button
                  onClick={handleCreateSchool}
                  sx={{
                    mt: 2,
                    color: "white",
                    bgcolor: "green",
                    fontSize: "1rem",
                  }}
                  type="submit"
                  variant="contained"
                  disableElevation
                >
                  Create School
                </Button>
              </Box>
            </Grid>
          </Grid>
        </ValidatorForm>
      </Box>
    </>
  );
};

export default CreateSchoolForm;
