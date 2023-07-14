import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import Appbar from "../components/appbar";
import SideBar from "../components/sidebar";
import DetailCard from "../components/DetailCard";
import CustomLineChart from "../components/LineChart";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
const customTheme = createTheme({ palette: { primary: { main: "#629460" } } });

export default function Home() {
  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ background: "#F5F5F5", height: "100vh" }}>
        <Appbar setDrawerState={setDrawerState} role={token.role} />
        <SideBar
          drawerState={drawerState}
          companyName={token.name}
          role={token.role}
        />
        <Box
          onClick={() => setDrawerState(false)}
          sx={{
            display: { xs: drawerState ? "block" : "none", md: "none" },
            position: "fixed",
            top: "0",
            right: "0",
            bottom: "0",
            height: "100vh",
            width: "115vh",
            background: "rgba(0,0,0,0.5)",
            zIndex: "99",
          }}
        ></Box>
        <Box
          sx={{
            ml: { md: "20vw" },
            pt: "0.7rem",
            fontFamily: "Open Sans",
            px: "0.5rem",
            overflowY: "scroll",
            background: "#F5F5F5",
            mb: "1rem",
          }}
        >
          <Toolbar />
          <Typography variant="h4" sx={{ ml: 5, fontWeight: "700" }}>
            {"Dashboard"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              ml: 5,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography mr={2}>
                {translateWord(locale, displayFilterData())}
              </Typography>
              <IconButton onClick={onBackwardClicked}>
                <ArrowBackIos sx={{ color: "#629460" }} />
              </IconButton>
              <IconButton onClick={onForwardClicked}>
                <ArrowForwardIos sx={{ color: "#629460" }} />
              </IconButton>
            </Box>
            <DefaultSelectComponent
              value={type}
              setValue={setType}
              options={FILTERTYPES}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <DetailCard
              label={"Tickets Purchased Today"}
              amount={ticketsPurchased}
              img={ticketImage}
            />
            <DetailCard
              label={"Number of Trips"}
              amount={numberOfTrips}
              img={tripImage}
            />
            <DetailCard
              label={"Total Earned Amount"}
              amount={totalEarnedAmount}
              img={paymentImage}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CustomLineChart
              previousYearData={data["lastYearSoldTicket"]}
              currentYearData={data["thisYearSoldTicket"]}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
