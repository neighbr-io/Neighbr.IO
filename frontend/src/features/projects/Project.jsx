import {
  useGetProjectsQuery } from "./projectSlice";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import stock_photo_storefront from "../../image/stock_photo_storefront.png"

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
        <img src={stock_photo_storefront} width="300" />
        <p className="title-main">{project.title}</p>
        <p className="subtitle-main">{project.subtitle}</p>
        <p className="goal-main">Goal: ${Number(project.goal).toLocaleString()}</p>
        <p className="funded-main">Funded: ${Number(project.funded).toLocaleString()}</p>
        <Button className="project-detail-button-main" onClick={() => {
            navigate(`/projects/${project.id}`);
        }}>See Project Details</Button>
      </div>
     ))}
    </div>
  );
};

export default Project;
