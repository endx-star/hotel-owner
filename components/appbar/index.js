import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, IconButton } from "@mui/material";
import { Person } from "@mui/icons-material";

export default function ButtonAppBar() {
  return (
    <AppBar sx={{ zIndex: 2 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, marginLeft: 7 }}
        >
          EthioBooking
        </Typography>

        <IconButton sx={{ marginRight: 0 }}>
          <Person />
        </IconButton>
        <Button sx={{ marginRight: 10, color: "white" }}>Hotel Owner</Button>
      </Toolbar>
    </AppBar>
  );
}
