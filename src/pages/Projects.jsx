import React, { useEffect, useState, useCallback } from "react";
import NavBar from "../components/UI/NavBar";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Pagination,
  CardActions,
  Button,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useCookies } from "react-cookie";
import { filteredProjects, IndexProjects } from "../api/Projects";

export default function Projects() {
  const [cookies] = useCookies(["AUTH_TOKEN"]);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const projectsPerPage = 15;
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      if (Object.values(filters).some((val) => val !== "")) {
        const data = await filteredProjects(cookies.AUTH_TOKEN, filters);
        if (data.ok) setRows(data.data);
      } else {
        const response = await IndexProjects(cookies.AUTH_TOKEN);
        if (response?.ok) setRows(response.data);
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

  const totalPages = Math.max(1, Math.ceil(rows.length / projectsPerPage));
  const startIndex = (page - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const paginatedRows = rows.slice(startIndex, endIndex);

  return (
    <>
      <NavBar />

      <Box sx={{ paddingTop: "80px", px: 3 }}>

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

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {rows.length === 0 ? (
              <Typography align="center" variant="h6" sx={{ mt: 4 }}>
                No projects found.
              </Typography>
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 3,
                  }}
                >
                  {paginatedRows.map((row) => (
                    <Box key={row.id} sx={{ width: 345 }}>
                      <Card sx={{ mx: "auto" }}>
                        <CardMedia
                          sx={{ height: 140 }}
                          image={row.image || "src/assets/logo.png"}
                          title={row.project_title || "Project Image"}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5">
                            {`Project ${row.id || "Title"}`}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            {row.description || "No description available."}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small" color="primary">
                            View
                          </Button>
                        </CardActions>
                      </Card>
                    </Box>
                  ))}
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(event, value) => setPage(value)}
                    color="primary"
                  />
                </Box>
              </>
            )}
          </>
        )}
      </Box>
    </>
  );
}
