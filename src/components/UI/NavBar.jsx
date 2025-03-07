import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { logout } from "../../redux/authSlice";
import { logout as logoutAPI } from "../../api/auth";
import { toast } from "react-toastify";
import ContactUs from "../Dialog/ContactUs";

export default function NavBar() {
  const [cookies, setCookie, removeCookie] = useCookies(["AUTH_TOKEN"]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  const [drawerOpen, setDrawerOpen] = useState(false);

  const onSubmit = () => {
    logoutAPI(cookies.AUTH_TOKEN).then((response) => {
      if (response?.ok) {
        toast.success(response?.message);
        removeCookie("AUTH_TOKEN");
        dispatch(logout(cookies.AUTH_TOKEN));
      } else {
        toast.error(response?.message);
      }
    });
  };

  const toggleDrawer = (state) => () => {
    setDrawerOpen(state);
  };

  const navButtons = (
    <>
      <Link to="/">
        <Button sx={{ color: "#2f3a8f", fontSize: "16px" }}>Home</Button>
      </Link>

      <Link to="/projects">
        <Button sx={{ color: "#2f3a8f", fontSize: "16px" }}>Projects</Button>
      </Link>
      <Button
        sx={{ color: "#2f3a8f", fontSize: "16px" }}
        onClick={() => setOpenContact(true)}
      >
        Contact Us
      </Button>
      {cookies.AUTH_TOKEN && (
        <Button sx={{ color: "#2f3a8f", fontSize: "16px" }}>Tools</Button>
      )}
      <Button
        variant="outlined"
        color={cookies.AUTH_TOKEN ? "error" : "primary"}
        sx={{
          color: cookies.AUTH_TOKEN ? "red" : "#2f3a8f",
          fontSize: "16px",
          marginLeft: isMobile ? "0" : "20px",
        }}
        onClick={() => {
          if (cookies.AUTH_TOKEN) {
            onSubmit();
          } else {
            navigate("/login");
          }
        }}
      >
        {cookies.AUTH_TOKEN ? "Logout" : "Login"}
      </Button>
    </>
  );

  const [openContact, setOpenContact] = useState(false);
  return (
    <>
      <AppBar
        sx={{
          backgroundColor: "white",
          boxShadow: "3px 3px 3px grey",
          padding: "10px 20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Box sx={{ width: isMobile ? "100px" : "100px" }}>
            <img
              src="src/assets/logo.png"
              alt="Logo"
              style={{ width: "100%" }}
            />
          </Box>
          <Box>
            {isMobile ? (
              <IconButton
                onClick={toggleDrawer(true)}
                sx={{ color: "#2f3a8f" }}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: "flex", gap: "20px" }}>{navButtons}</Box>
            )}
          </Box>
        </Box>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
          }}
        >
          {navButtons}
        </Box>
      </Drawer>

      <ContactUs openContact={openContact} setOpenContact={setOpenContact} />
    </>
  );
}
