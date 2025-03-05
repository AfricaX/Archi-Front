import React, { useEffect, useState } from "react";
import NavBar from "../components/UI/NavBar";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useCookies } from "react-cookie";
import { IndexProjects } from "../api/Projects";

export default function Projects() {
  const [cookies] = useCookies(["AUTH_TOKEN"]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const retrieve = async () => {
      try {
        const response = await IndexProjects(cookies.AUTH_TOKEN);
        if (response?.ok) {
          setRows(response.data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    retrieve();
  }, []);

  return (
    <>
      <NavBar />

      <Box sx={{ paddingTop: "80px", px: 3 }}>
        <Typography variant="h3" gutterBottom align="center">
          List of Projects
        </Typography>


        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 3,
          }}
        >
          {rows.map((row) => (
            <Box key={row.id} sx={{ width: 345 }}>
              {" "}
              <Card sx={{ mx: "auto" }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={row.image || "src/assets/logo.png"}
                  title={row.title || "Project Image"}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {row.title || "Project Title"}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {row.description || "No description available."}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
