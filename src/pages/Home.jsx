import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import checkAuth from "../hoc/checkToken";
import NavBar from "../components/UI/NavBar";
import Calculator from "../components/UI/Calculator";

function Home() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Container>
      <NavBar/>
      <Box sx={{paddingTop:"70px"}}>
        <Typography variant="h1">Welcome , {user?.name ?? "Guest"}</Typography>
      </Box>
      <Calculator/>
    </Container>
  );
}

export default checkAuth(Home);
