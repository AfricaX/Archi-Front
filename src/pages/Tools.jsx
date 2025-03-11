import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NavBar from "../components/UI/NavBar";
import { IndexProjects } from "../api/Projects";

export default function Tools() {
  const [projects, setProjects] = useState([]);

  const retrieveProjects = async () => {
    try {
      const response = await IndexProjects();
      console.log("API Response:", response); // Debugging output

      if (response && response.data) {
        setProjects(response.data);
      } else {
        console.error("Unexpected API response structure:", response);
      }
    } catch (error) {
      console.error("Error Fetching Projects", error);
    }
  };

  useEffect(() => {
    retrieveProjects();
  }, []);

  return (
    <>
      <NavBar />
      <Box sx={{ paddingTop: "70px", px: 3 }}>
        <Typography variant="h4" gutterBottom>
          Projects List
        </Typography>

        <Paper sx={{ overflowX: "auto" }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                  <TableCell>ID</TableCell>
                  <TableCell>Project Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Lot Size (sqm)</TableCell>
                  <TableCell>Floors</TableCell>
                  <TableCell>Finish Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No projects available.
                    </TableCell>
                  </TableRow>
                ) : (
                  projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>{project.id}</TableCell>
                      <TableCell>{project.title || "N/A"}</TableCell>
                      <TableCell>
                        {project.description || "No description"}
                      </TableCell>
                      <TableCell>{project.lotSize || "N/A"}</TableCell>
                      <TableCell>{project.floors || "N/A"}</TableCell>
                      <TableCell>{project.finishType || "N/A"}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
}
