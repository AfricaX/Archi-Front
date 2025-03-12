import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import React from "react";

export default function EditDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Project</DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ width: "400px", mx: "auto" }}>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="Project Title"
              variant="outlined"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="Description"
              variant="outlined"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="Lot Size"
              variant="outlined"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="Number of Floors"
              variant="outlined"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              label="Type of Finish"
              variant="outlined"
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Project Images
            </Typography>
            <input type="file" accept="image/*" style={{ display: "block" }} />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
