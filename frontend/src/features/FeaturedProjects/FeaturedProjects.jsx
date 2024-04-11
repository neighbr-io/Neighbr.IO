import {
  useGetProjectsQuery
} from "../projects/projectSlice";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid"
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import stock_photo_storefront from "../../image/stock_photo_storefront.png"

const StyledGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
}));

function FeaturedProjects() {
  const { data: projects, error, isLoading } = useGetProjectsQuery();
  const navigate = useNavigate();

  const shuffleArray = (array) => {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !projects) {
    return <div>Error occurred while retrieving data </div>;
  }

  const liveProjects = projects.filter(project => project.status === 'live'); 
  const featuredProjects = shuffleArray(liveProjects).slice(0, 3);

  return (
  <>
    <h4> Featured Projects </h4>
    <div className="all-projects">
      {featuredProjects.map((project) => (
        <div key={project.id} className="project-preview"
        onClick={() => navigate(`/projects/${project.id}`)}
        style={{ cursor: 'pointer' }}
        >
        <img src={stock_photo_storefront} width="100%" />
        <p className="title-main">{project.title}</p>
        <p className="subtitle-main">{project.subtitle}</p>
        <p className="goal-main">Goal: ${Number(project.goal).toLocaleString()}</p>
        <p className="funded-main">Funded: ${Number(project.funded).toLocaleString()}</p>
      </div>
     ))}
    </div>
    <hr />
  </>
  );
};

export default FeaturedProjects;
