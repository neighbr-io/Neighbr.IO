import { useState } from "react";
import {
  useGetProjectsQuery } from "./projectSlice";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Project = ({ setTitle, setSubtitle, setGoal, setStory, searchText = "" }) => {
  const { data = {}, error, isLoading } = useGetProjectsQuery();
  // const [title, setTitle] = useState(project.title);
  // const [subtitle, setSubtitle] = useState(project.subtitle);
  // const [goal, setGoal] = useState(project.goal);
  // const [story, setStory] = useState(project.story);

  const navigate = useNavigate();
  const filteredProjects =
    data?.projects?.filter((project) =>
      project.title?.toLowerCase().includes(searchText.toLowerCase())
    ) || [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: </div>;
  }
  return (
    <div className="all-projects">
      {filteredProjects.map((project) => (
        <div className="project-preview">
        <p className="title">{project.title}</p>
        <p className="goal">${project.goal}</p>
        <Button variant="contained" size="small" sx={{bgcolor: "gray", mx: "auto"}} onClick={() => {
            alert(`Project Story: ${project.story}`);
        }}>See More Details</Button>
        <Button variant="contained" size="small" sx={{bgcolor: "black", mx: "auto"}} onClick={() => {
            navigate(`projects/${project.id}`);
            setTitle(project.title);
            setSubtitle(project.subtitle);
        }}>Test Button</Button>
      </div>
      ))}
    </div>
  );
};

export default Project;
