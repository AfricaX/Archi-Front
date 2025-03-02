import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import checkAuth from "../hoc/checkToken";
import AppBar from "../components/AppBar";

function Home() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Box>
      <AppBar />
      <Typography variant="h1">Welcome , {user?.name ?? "Guest"}</Typography>
    </Box>
  );
}

export default checkAuth(Home);
