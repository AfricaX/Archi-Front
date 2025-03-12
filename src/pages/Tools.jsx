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
  IconButton,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import NavBar from "../components/UI/NavBar";
import { filteredProjects, IndexProjects } from "../api/Projects";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCookies } from "react-cookie";
import CreateDialog from "../components/Dialog/Projects Dialog/CreateDialog";
import EditDialog from "../components/Dialog/Projects Dialog/EditDialog";
import DeleteDialog from "../components/Dialog/Projects Dialog/DeleteDialog";

export default function Tools() {
  const [cookies] = useCookies(["AUTH_TOKEN"]);
  const [projects, setProjects] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    finish_type: "",
    floors: "",
    lot_size: "",
  });

  const handleFilterChange = (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [event.target.name]: event.target.value,
    }));
  };

  const fetchProjects = useCallback(async () => {
    try {
      if (Object.values(filters).some((val) => val !== "")) {
        const data = await filteredProjects(cookies.AUTH_TOKEN, filters);
        if (data.ok) setProjects(data.data);
      } else {
        const response = await IndexProjects(cookies.AUTH_TOKEN);
        if (response?.ok) setProjects(response.data);
      }
      setPage(1);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  }, [cookies.AUTH_TOKEN, filters]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const [openCreate, setOpenCreate] = useState(false);

  const handleOpenCreate = () => {
    setOpenCreate();
  }
  return (
    <>
      <NavBar />
      <Box sx={{ paddingTop: "70px", px: 3 }}>
        <Typography variant="h4" gutterBottom>
          Projects List
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
            alignItems: "flex-end",
            mb: 3,
          }}
        >
          <TextField
            label="Search by Title"
            variant="outlined"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            sx={{ width: 200 }}
          />

          <Box sx={{ width: 200 }}>
            <InputLabel sx={{ mb: 1, display: "block" }}>
              Finish Type
            </InputLabel>
            <Select
              fullWidth
              name="finish_type"
              value={filters.finish_type}
              onChange={handleFilterChange}
              variant="outlined"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Basic">Basic</MenuItem>
              <MenuItem value="Standard">Standard</MenuItem>
              <MenuItem value="Luxury">Luxury</MenuItem>
            </Select>
          </Box>

          <Box sx={{ width: 200 }}>
            <InputLabel sx={{ mb: 1, display: "block" }}>Floors</InputLabel>
            <Select
              fullWidth
              name="floors"
              value={filters.floors}
              onChange={handleFilterChange}
              variant="outlined"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4+</MenuItem>
            </Select>
          </Box>

          <TextField
            label="Lot Size (sqm)"
            variant="outlined"
            name="lot_size"
            value={filters.lot_size}
            onChange={handleFilterChange}
            type="number"
            sx={{ width: 200 }}
          />

          <Box sx={{ width: 200, display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={fetchProjects}
              fullWidth
            >
              Apply Filters
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button variant="contained" color="success" onClick={handleOpenCreate}>
            Create Project
          </Button>
        </Box>{" "}
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
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No projects available.
                    </TableCell>
                  </TableRow>
                ) : (
                  projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>{project.id}</TableCell>
                      <TableCell>{project.project_title || "N/A"}</TableCell>
                      <TableCell>
                        {project.description || "No description"}
                      </TableCell>
                      <TableCell>
                        {project.lot_size ? `${project.lot_size} sqm` : "N/A"}
                      </TableCell>
                      <TableCell>{project.floors || "N/A"}</TableCell>
                      <TableCell>{project.finish_type || "N/A"}</TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <IconButton color="primary">
                            <EditIcon />
                          </IconButton>
                          <IconButton color="error">
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <CreateDialog 
      openCreate={openCreate}
      setOpenCreate={set}/>
      <EditDialog/>
      <DeleteDialog/>

    </>
  );
}
