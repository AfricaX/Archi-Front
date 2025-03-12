import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

export default function CreateDialog() {
  return (
    <>
      <Dialog open={false}>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ width: "400px", mx: "auto" }}>
            <Box sx={{ mb: 2 }}>
              <TextField
                id="project_title"
                required
                fullWidth
                size="small"
                label="Project Title"
                variant="outlined"
                sx={{
                  boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                id="description"
                required
                fullWidth
                size="small"
                label="Description"
                variant="outlined"
                sx={{
                  boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                id="lot_size"
                required
                fullWidth
                size="small"
                label="Lot Size"
                variant="outlined"
                sx={{
                  boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                id="floors"
                required
                fullWidth
                size="small"
                label="Number of Floors"
                variant="outlined"
                sx={{
                  boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                id="finish_type"
                required
                fullWidth
                size="small"
                label="Type of Finish"
                variant="outlined"
                sx={{
                  boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.1)",
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                {" "}
                Project Images
              </Typography>
              <input
                type="file"
                accept="image/*"
                style={{ display: "block" }}
              />
            </Box>

            <Box sx={{ mb: 3, textAlign: "center" }}>
              <Button
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
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
