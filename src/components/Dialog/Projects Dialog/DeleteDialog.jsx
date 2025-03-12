import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import React from "react";

export default function DeleteDialog() {
  return (
    <Dialog open={false} >
      <DialogTitle>Delete Project</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this project? This action cannot be
          undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined">
          Cancel
        </Button>
        <Button variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
