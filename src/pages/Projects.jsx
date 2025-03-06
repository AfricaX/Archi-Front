import React, { useEffect, useState } from "react";
import NavBar from "../components/UI/NavBar";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Pagination,
  CardActions,
  CardActionArea,
  Button,
} from "@mui/material";
import { useCookies } from "react-cookie";
import { IndexProjects } from "../api/Projects";

export default function Projects() {
  const [cookies] = useCookies(["AUTH_TOKEN"]);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const projectsPerPage = 15;

  useEffect(() => {
    const retrieve = async () => {
      try {
        console.log("Fetching projects...");
        const response = await IndexProjects(cookies.AUTH_TOKEN);
        console.log("API Response:", response);
        if (response?.ok) {
          setRows(response.data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    retrieve();
  }, []);


  const startIndex = (page - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const paginatedRows = rows.slice(startIndex, endIndex);

  return (
    <>
      <NavBar />

      <Box sx={{ paddingTop: "80px", px: 3 }}>
        <Typography variant="h3" gutterBottom align="center">
          List of Projects
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 , marginBottom:"10px"}}>
          <Pagination
            count={Math.ceil(rows.length / projectsPerPage)}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
          />
        </Box>

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
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {row.description || "No description available."}
                  </Typography>
                </CardContent>
                <CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                  </CardActions>
                </CardActionArea>
              </Card>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            count={Math.ceil(rows.length / projectsPerPage)}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
          />
        </Box>
      </Box>
    </>
  );
}
