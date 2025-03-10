import { Box, Typography } from "@mui/material";
import React from "react";

export default function Gutter() {


  return (
    <>
        <Box
          sx={{
            bottom: 0,
            left: 0,
            width: "100%",
            bgcolor: "#333",
            color: "white",
            py: 1.5,
            marginTop:"50px",
            textAlign: "center",
            boxShadow: "0px -2px 10px rgba(0,0,0,0.2)",
            opacity: 0.9,
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            BrightFuture Homes Inc.
          </Typography>
          <Typography variant="body2">
            Email: contact@brightfuturehomes.com
          </Typography>
          <Typography variant="body2">Phone: +63 912 345 6789</Typography>
          <Typography variant="body2">
            Address: 1234 Sunshine St., Makati City, Philippines
          </Typography>
        </Box>

    </>
  );
}
