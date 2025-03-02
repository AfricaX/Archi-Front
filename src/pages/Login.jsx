import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as LoginAPI } from "../api/auth";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies, removeCookies] = useCookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    LoginAPI({
      email,
      password,
    }).then((res) => {
      if (res?.ok) {
        console.log(res);
        setCookies("AUTH_TOKEN", res.data.token);
        dispatch(login(res.data));
        navigate("/");

        toast.success(res?.message ?? "Logged In Successfully");
      } else {
        toast.error(res?.message ?? "Oops Something Went Wrong.");
      }
    });
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          height: "auto",
          width: 400,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
          padding: 3,
        }}
      >
        <Typography variant="h4" sx={{ textAlign: "center", mb: 3 }}>
          Login
        </Typography>

        <Box
          sx={{ width: "100%", mx: "auto" }}
          component="form"
          onSubmit={onSubmit}
        >
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="Email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              sx={{
                boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              size="small"
              label="Password"
              type="password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              sx={{
                boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Box>

          <Box sx={{ mb: 3, textAlign: "center" }}>
            <Button
              variant="contained"
              sx={{
                width: "100%",
                borderRadius: 5,
                padding: "10px 0",
              }}
              type="submit"
            >
              Login
            </Button>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Typography variant="body2" color="textSecondary">
                Don't have an account yet? <strong>Sign up</strong>
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
