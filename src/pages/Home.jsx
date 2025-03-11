import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import checkAuth from "../hoc/checkToken";
import NavBar from "../components/UI/NavBar";
import Calculator from "../components/UI/Calculator";
import Recents from "../components/UI/Recents";
import Gutter from "../components/UI/Gutter";

function Home() {
  const user = useSelector((state) => state.auth.user);
  return (
    <>
      {" "}
      <Container>
        <NavBar />
        <Box sx={{ paddingTop: "70px" }}>
          <Typography variant="h1">
            Welcome , {user?.name ?? "Guest"}
          </Typography>
        </Box>
        <Calculator />
        <Recents />
      </Container>
      <Gutter />
    </>
  );
}

export default checkAuth(Home);
