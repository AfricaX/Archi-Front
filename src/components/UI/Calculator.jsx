import {
  Box,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";

export default function Calculator() {
  const [lotSize, setLotSize] = useState("");
  const [floors, setFloors] = useState("");
  const [finish, setFinish] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  const handleChange = (e) => {
    setFinish(e.target.value);
  };

  const costPerSqm = {
    Basic: 15000,
    Standard: 30000,
    Luxury: 45000,
  };

  const calculateCost = () => {
    const sqm = (Number(lotSize) || 0) * (Number(floors) || 1);
    const cost = sqm * (costPerSqm[finish] || 0);
    setTotalCost(cost);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        backgroundColor: "#f4f4f4",
        padding: 2,
        gap: 4,
      }}
    >
      <Box
        elevation={6}
        sx={{
          padding: 4,
          width: "90%",
          maxWidth: 400,
          borderRadius: "12px",
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Home Calculator
        </Typography>

        <Box container spacing={2}>
          <Box item xs={12}>
            <Typography align="left">Lot Size</Typography>
            <TextField
              fullWidth
              size="small"
              label="Enter Lot Size"
              variant="outlined"
              type="number"
              value={lotSize}
              onChange={(e) => setLotSize(e.target.value)}
            />
          </Box>

          <Box item xs={12}>
            <Typography align="left">Floors</Typography>
            <TextField
              fullWidth
              size="small"
              label="Enter Number of Floors"
              variant="outlined"
              type="number"
              value={floors}
              onChange={(e) => setFloors(e.target.value)}
            />
          </Box>

          <Box item xs={12}>
            <Typography align="left">Type of Finish</Typography>
            <Select
              fullWidth
              size="small"
              value={finish}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="" disabled sx={{ textAlign: "left" }}>
                Select Type of Finish
              </MenuItem>
              <MenuItem value="Basic">Basic</MenuItem>
              <MenuItem value="Standard">Standard</MenuItem>
              <MenuItem value="Luxury">Luxury</MenuItem>
            </Select>
          </Box>

          <Box>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{ marginTop: "10px" }}
              onClick={calculateCost}
            >
              {" "}
              Calculate
            </Button>
          </Box>
        </Box>
      </Box>

      <Box
        elevation={6}
        sx={{
          padding: 4,
          width: "90%",
          maxWidth: 400,
          borderRadius: "12px",
          textAlign: "center",
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Loan Amount Needed For Project
        </Typography>

        <Typography variant="h3" color="primary">
          {totalCost > 0 ? `₱${totalCost.toLocaleString()}` : "₱0"}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
          <Button variant="contained" color="primary" fullWidth>
            Contact Us
          </Button>
          <Button variant="outlined" color="primary" fullWidth>
            View Project Designs
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
