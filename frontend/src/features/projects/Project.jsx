import { useState } from "react";
import {
  useGetProjectsQuery } from "./projectSlice";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function Project () {
  const { data: projects, error, isLoading } = useGetProjectsQuery();
  console.log("data", projects);
  
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !projects ) {
    return <div>Error occurred while retrieving data </div>;
  }
  // const filteredProjects =
  //   projects.filter((project) =>
  //     project.title.toLowerCase().includes(searchText.toLowerCase())
  //   );
  return (
    <div className="all-projects">
      {projects.map((project) => (
        <div key={project.id} className="project-preview">
        <p className="title">{project.title}</p>
        <p className="goal">${project.goal}</p>
        <Button variant="contained" size="small" sx={{bgcolor: "black", mx: "auto"}} onClick={() => {
            navigate(`/projects/${project.id}`);
        }}>See Project Details</Button>
      </div>
     ))}
    </div>
  );
};

export default Project;
