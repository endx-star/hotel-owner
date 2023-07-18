import * as React from "react";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import jwt from "jsonwebtoken";
import { useCookie } from "../utils/cookies";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Head from "next/head";

// import Sheraton from "../assets/image/Sheraton.jpg";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      marginTop={30}
      // {...props}
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
const defaultTheme = createTheme();

const login = () => {
  const router = useRouter();
  const [getCookie, setCookie] = useCookie();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const goToSignUp = () => {
    router.push("signUp");
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Head>
        <title>Hotel Owner</title>
      </Head>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://upload.wikimedia.org/wikipedia/commons/1/15/Sheraton_Hotel%2C_Addis_Ababa_%282058298419%29.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                // autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item marginLeft={30} marginTop={5} fontSize={20}>
                  <text>Don't have an account? </text>
                  <Link href="/signUp" variant="body2">
                    Sign Up
                  </Link>
                  {/* <Button onClick={goToSignUp}>Sign Up</Button> */}
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export const getServerSideProps = (ctx) => {
  const { req } = ctx;
  const token = req["cookies"]["token"];
  if (token) {
    jwt.verify(token, process.env.JWT_KEY);
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default login;
