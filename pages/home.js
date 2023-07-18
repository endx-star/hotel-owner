import * as React from "react";
import AppBar from "../components/appbar";
import { createTheme, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import SideBar from "../components/sidebar";
import jwt from "jsonwebtoken";

const customTheme = createTheme({ palette: { primary: { main: "#629460" } } });

const Home = (token) => {
  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ background: "#F5F5F5", height: "100vh" }}>
        <AppBar />
        <SideBar />
      </Box>
    </ThemeProvider>
  );
};

export const getServerSideProps = async (ctx) => {
  const { req } = ctx;
  const token = req["cookies"]["token"];
  console.log(token);
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const tokenDecoded = jwt.verify(token, process.env.JWT_KEY);
  console.log(tokenDecoded);
  return {
    props: { token: tokenDecoded },
  };
};

export default Home;
