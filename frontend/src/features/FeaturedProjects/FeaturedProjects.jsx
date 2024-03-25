import {
  useGetProjectsQuery
} from "../projects/projectSlice";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid"
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

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

  const featuredProjects = shuffleArray(projects).slice(0, 3);

  return (
    <StyledGrid container>
      {featuredProjects.map((project) => (
        <StyledGrid item xs={12} sm={6} md={4} key={project.id}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
            <Typography variant="body1">{project.title}</Typography>
            <Grid container direction="column">
              <Grid item>
                <Typography variant="body1">Goal: ${project.goal}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1">Funded: ${project.funded}</Typography>
              </Grid>
            </Grid>
          </div>
          <Button variant="contained" size="small" sx={{ bgcolor: "grey", mx: "auto", marginTop: 1 }} onClick={() => {
            navigate(`/projects/${project.id}`);
          }}>See Project Details</Button>
        </StyledGrid>
      ))}
    </StyledGrid>
  );
};

export default FeaturedProjects;
