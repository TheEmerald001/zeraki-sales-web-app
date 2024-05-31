import * as React from "react";
import { useState } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setCurrentUser } from "../../features/user/userSlice";
import background from "../../images/background.png";

import {
  Typography,
  Container,
  Box,
  Button,
  CssBaseline,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Zeraki_Logo from "../../images/Zeraki_Logo.png";
import Copyright from "../utilities/Copyright";
import CustomSnackBar from "../utilities/CustomSnackBar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import { userLogIn } from "../../api/security/security";

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [processing, setProcessing] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",

    showPassword: false,

    snackbarMessage: "",
    openSnackbar: false,
    snackbarSeverity: "success",
  });

  const {
    email,
    password,

    showPassword,

    snackbarMessage,
    openSnackbar,
    snackbarSeverity,
  } = values;

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const userAuth = (usersPayload) => {
    const isAuth = usersPayload.some(
      (user) => user.email === email && user.password === password
    );
    return isAuth;
  };

  const setUser = (email, password, usersPayload) => {
    const matchingUsers = usersPayload.filter(
      (user) => user.email === email && user.password === password
    );
    return matchingUsers.length > 0 ? matchingUsers[0] : null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    userLogIn(email, password)
      .then((res) => {
        if (res.status === 200) {
          if (userAuth(res.data)) {
            dispatch(
              setCurrentUser({
                currentUser: setUser(email, password, res.data),
              })
            );
            navigate("/dashboard");
          } else {
            setValues({
              email: "",
              password: "",

              snackbarMessage: "Invalid Credentials, try again.",
              openSnackbar: true,
              snackbarSeverity: "error",
            });
            setProcessing(false);
          }
        }
      })
      .catch((err) => {
        setValues({
          email: "",
          password: "",

          snackbarMessage: "Something went wrong.",
          openSnackbar: true,
          snackbarSeverity: "error",
        });
        setProcessing(false);
      });
  };
  const setPasswordVisibility = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: !values[prop],
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setValues({ ...values, openSnackbar: false });
  };

  return (
    <ThemeProvider theme={theme}>
      <CustomSnackBar
        openSnackbar={openSnackbar}
        handleClose={closeSnackbar}
        snackbarMessage={snackbarMessage}
        snackbarSeverity={snackbarSeverity}
      />
      <Container
        maxWidth="xl"
        sx={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        >
          <Box>
            <img
              alt="Zeraki Logo"
              src={Zeraki_Logo}
              style={{ width: "300px", height: "42px", marginRight: "20px" }}
            ></img>
          </Box>
          <Typography component="h6" variant="h6" color={"white"}>
            Welcome Back!
          </Typography>
          <ValidatorForm autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
            <TextValidator
              sx={{
                mt: 3,
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& label": {
                  color: "white",
                },
                "& input": {
                  color: "white",
                },
                "& .MuiInput-underline:before": {
                  borderBottomColor: "white",
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottomColor: "white",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "white",
                },
              }}
              required
              fullWidth
              onChange={handleChange("email")}
              name="email"
              value={email}
              label="Email Address"
              validators={["isEmail", "required"]}
              errorMessages={["Email is Invalid", "This Field is Required"]}
            />{" "}
            <TextField
              type={values.showPassword ? "text" : "password"}
              sx={{
                mt: 3,
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& label": {
                  color: "white",
                },
                "& input": {
                  color: "white",
                },
                "& .MuiInput-underline:before": {
                  borderBottomColor: "white",
                },
                "& .MuiInput-underline:hover:before": {
                  borderBottomColor: "white",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "white",
                },
              }}
              fullWidth
              required
              id="password"
              label="Password"
              name="password"
              value={password}
              onChange={handleChange("password")}
              errorMessages={["This Field is Required"]}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={setPasswordVisibility("showPassword")}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {processing ? (
              <Button
                fullWidth
                startIcon={<CircularProgress size={20} />}
                variant="outlined"
                sx={{ mt: 2, mb: 2, cursor: "not-allowed" }}
              >
                Authenticating...
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            )}
            <Link to="/password-reset" variant="body2">
              <Typography color={"white"}>Forgot password?</Typography>
            </Link>
          </ValidatorForm>
        </Box>
      </Container>
      <Copyright />
    </ThemeProvider>
  );
}
