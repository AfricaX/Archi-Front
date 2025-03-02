import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import { register } from "../api/auth";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

export default function Register() {
  const [warnings, setWarnings] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies();
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();

    if (!loading) {
      const body = {
        name: $("#name").val(),
        email: $("#email").val(),
        password: $("#password").val(),
      };
      setLoading(true);
      register(body)
        .then((res) => {
          if (res?.ok) {
            toast.success(res?.message ?? "Account has been Registered.");
            setCookies("AUTH_TOKEN", res.data.token);
            dispatch(login(res.data))
            navigate("/");
          } else {
            toast.error(res?.message ?? "Oops Something Went Wrong.");
            setWarnings(res?.errors);
          }

          console.log(res);
        })
        .finally(() => {
          setLoading(false);
        });
    }
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
          Register
        </Typography>

        <Box
          component="form"
          onSubmit={onSubmit}
          sx={{ width: "100%", mx: "auto" }}
        >
          <Box sx={{ mb: 2 }}>
            <TextField
              id="name"
              required
              fullWidth
              size="small"
              label="Username"
              variant="outlined"
              sx={{
                boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
            {warnings?.name ? (
              <Typography sx={{ fontSize: 12 }} component="small" color="error">
                {warnings.name}
              </Typography>
            ) : null}
          </Box>

          <Box sx={{ mb: 2 }}>
            <TextField
              id="email"
              required
              fullWidth
              size="small"
              label="Email"
              variant="outlined"
              sx={{
                boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
            {warnings?.email ? (
              <Typography sx={{ fontSize: 12 }} component="small" color="error">
                {warnings.email}
              </Typography>
            ) : null}
          </Box>

          <Box sx={{ mb: 3 }}>
            <TextField
              id="password"
              required
              fullWidth
              size="small"
              label="Password"
              type="password"
              variant="outlined"
              sx={{
                boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
              }}
            />
            {warnings?.password ? (
              <Typography sx={{ fontSize: 12 }} component="small" color="error">
                {warnings.password}
              </Typography>
            ) : null}
          </Box>

          <Box sx={{ mb: 3, textAlign: "center" }}>
            <Button
              disabled={loading}
              variant="contained"
              type="submit"
              sx={{
                width: "100%",
                borderRadius: 5,
                padding: "10px 0",
              }}
            >
              Register
            </Button>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Typography variant="body2" color="textSecondary">
                Already have an account? <strong>Log In</strong>
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
