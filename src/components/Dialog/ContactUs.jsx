import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import React, { useState } from "react";

export default function ContactUs({ openContact, setOpenContact }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Submitted Contact Form:", formData);
    setOpenContact(false);
  };

  return (
    <Dialog
      open={openContact}
      onClose={() => setOpenContact(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Contact Us</DialogTitle>
      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Reach out to us at <strong>BrightFuture Homes Inc.</strong> for any inquiries!
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2">
            📍 123 Dream Avenue, Makati, Philippines 📞 +63 912 345 6789 📧
            support@brightfuturehomes.com
          </Typography>
        </Box>

        <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
          Send us a message:
        </Typography>

        <TextField
          label="Your Name"
          variant="outlined"
          fullWidth
          name="name"
          value={formData.name}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Your Email"
          variant="outlined"
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />

        <TextField
          label="Your Message"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          name="message"
          value={formData.message}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setOpenContact(false)} color="error">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Send Message
        </Button>
      </DialogActions>
    </Dialog>
  );
}
