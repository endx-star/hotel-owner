import * as React from "react";
import AppBar from "../components/appbar";
import { createTheme, ThemeProvider } from "@mui/material";
import Box from "@mui/material/Box";
import SideBar from "../components/sidebar";

const customTheme = createTheme({ palette: { primary: { main: "#629460" } } });

export default function Home() {
  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ background: "#F5F5F5", height: "100vh" }}>
        <AppBar />
        <SideBar />
      </Box>
    </ThemeProvider>
  );
}
