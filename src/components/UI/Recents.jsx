import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { recents } from "../../api/Projects";

export default function Recents() {
  const [recentProjects, setRecentProjects] = useState([]);

  useEffect(() => {
    const retrieveRecents = async () => {
      try {
        const response = await recents();
        if (response?.ok) {
          setRecentProjects(response.data);
        }
      } catch (error) {
        console.error("Error fetching recent projects:", error);
      }
    };

    retrieveRecents();
  }, []);

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Recent Projects
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)", // 5 cards per row
          gap: 2,
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {recentProjects.length === 0 ? (
          <Typography align="center" sx={{ width: "100%", mt: 2 }}>
            No recent projects available.
          </Typography>
        ) : (
          recentProjects.map((project) => (
            <Card key={project.id} sx={{ maxWidth: "100%", height: "100%" }}>
              <CardMedia
                component="img"
                height="200"
                image="src/assets/logo.png"
                alt={project.title}
              />
              <CardContent>
                <Typography variant="h6">
                  {" "}
                  {`Project ${project.id || "Title"}`}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {project.description || "No description available."}
                </Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Box>
    </Box>
  );
}
