import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import jwt from "jsonwebtoken";
import Grid from "@mui/material/Grid";
import { MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import { InputAdornment, Tooltip, IconButton } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import { ToastContainer, toast } from "react-toastify";
// import { PacmanLoader } from "react-spinners";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useCookie } from "../utils/cookies";
import { uploadFile } from "../utils/uploadFile";

import {
  validateName,
  validateEmail,
  validatePassword,
  validatePhone,
} from "@/utils/validate";
import { useMutation, gql } from "@apollo/client";

const MUTATESIGNUP = gql`
  mutation addHotel($input: HotelInput!) {
    addHotel(hotel: $input) {
      _id
      name
      phoneNumber
      location
      email
      password
      photo
      token
    }
  }
`;
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        EthioBooking.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const cities = [
  {
    value: "addisAbaba",
    label: "Addis Ababa",
  },
  {
    value: "bahirDar",
    label: "Bahir Dar",
  },
  {
    value: "adama",
    label: "Adama",
  },
  {
    value: "mekelle",
    label: "Mekelle",
  },
  {
    value: "direDawa",
    label: "Dire Dawa",
  },
];

const defaultTheme = createTheme();

const SignUp = () => {
  // const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);
  const [location, setLocation] = useState("");
  const [locationError, setLocationError] = useState(false);
  const [phoneNumber, setphoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoError, setPhotoError] = useState(false);
  const [addHotel] = useMutation(MUTATESIGNUP);
  const [getCookie, setCookie] = useCookie();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateInput()) {
      setLoading(true);
      try {
        const resp = await addHotel({
          variables: {
            input: {
              name,
              location,
              phoneNumber,
              email,
              password: passwordValue,
            },
          },
        });
        setCookie("token", resp["data"]["addHotel"]["token"]);
        sessionStorage.setItem("hotelID", resp["data"]["addHotel"]["_id"]);
        sessionStorage.setItem("hotelOwner", resp["data"]["addHotel"]["name"]);
        await uploadFile(photo, resp["data"]["addHotel"]["token"]);
        setLoading(false);
        await router.replace("/home");
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    }
  };

  const handleUploadFile = async (e) => {
    if (e.target.files[0]) {
      setPhotoError(false);
      setPhoto(e.target.files[0]);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (validateName(e.target.value)) {
      setNameError(false);
    } else {
      setNameError(true);
    }
  };
  // const handleLocationChange = (e) => {
  //   setLocation(e.target.value);
  //   if (validateLocation(e.target.value)) {
  //     setLocationError(false);
  //   } else {
  //     setLocationError(true);
  //   }
  // };
  const handlePhoneChange = (e) => {
    setphoneNumber(e.target.value);
    if (validatePhone(e.target.value)) {
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (validateEmail(e.target.value)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
    if (validatePassword(e.target.value)) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const goToSignIn = () => {
    router.replace("/");
  };

  const validateInput = () => {
    let returnedValue = true;
    if (name === "" || nameError) {
      returnedValue = false;
      setNameError(true);
    }
    // if (location === "" || locationError) {
    //   returnedValue = false;
    //   setLocationError(true);
    // }
    if (passwordValue === "" || passwordError) {
      returnedValue = false;
      setPasswordError(true);
    }
    if (phoneNumber === "" || phoneError) {
      returnedValue = false;
      setPhoneError(true);
    }
    if (email === "" || emailError) {
      returnedValue = false;
      setEmailError(true);
    }
    if (!photo) {
      setPhotoError(true);
      returnedValue = false;
    }
    return returnedValue;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Tooltip title={nameError ? "Please enter a valid name" : ""}>
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    type={"text"}
                    id="name"
                    value={name}
                    error={nameError}
                    label="Hotel Name"
                    autoFocus
                    onChange={handleNameChange}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="location"
                  value={location}
                  select
                  label="Hotel Location"
                >
                  {cities.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Tooltip
                  title={phoneError ? "Please Enter a valid Phone Number" : ""}
                >
                  <TextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon />
                        </InputAdornment>
                      ),
                    }}
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    autoComplete="phoneNumber"
                    value={phoneNumber}
                    error={phoneError}
                    onChange={handlePhoneChange}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12}>
                <Tooltip title={emailError ? "Please Enter a valid email" : ""}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type="email"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailOutlineIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={email}
                    error={emailError}
                    onChange={handleEmailChange}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12}>
                <Tooltip
                  title={
                    passwordError
                      ? "Please enter at least eight characters"
                      : ""
                  }
                >
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={passwordValue}
                    error={passwordError}
                    onChange={handlePasswordChange}
                  />
                </Tooltip>
              </Grid>
              <Tooltip title={photoError ? "Please upload photo" : ""}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "520px",
                    height: "70px",
                    background: "rgba(240, 240, 240, 1)",
                    // boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.15)",
                    px: "14px",
                    borderRadius: "5px",
                    my: "2rem",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Open Sans",
                      color: "#848484",
                    }}
                  >
                    {photo === null ? "Upload Photo" : photo["name"]}
                  </Typography>
                  <Button variant="outlined" component={"label"}>
                    {"Upload"}
                    <input
                      type={"file"}
                      hidden
                      onChange={(e) => {
                        handleUploadFile(e);
                      }}
                      name="photo"
                      accept="pdf,image/*"
                    />
                  </Button>
                </Box>
              </Tooltip>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <ThemeProvider>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <text>Already have an account? </text>
                  <Button onClick={goToSignIn}>Sign in</Button>
                </Grid>
              </Grid>
            </ThemeProvider>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export const getServerSideProps = async (ctx) => {
  const { req, res } = ctx;
  const token = await req["cookies"]["token"];
  if (token) {
    jwt.verify(token, process.env.JWT_KEY);
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
    props: {
    }
  }
};

export default SignUp;
