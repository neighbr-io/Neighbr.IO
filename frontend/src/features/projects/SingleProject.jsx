import { useGetProjectQuery } from "./projectSlice";
import React from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import InfoTabs from "./SingleProjectTab";
import "./SingleProject.css";
import stock_photo_storefront from "../../image/stock_photo_storefront.png";
import { useNavigate } from 'react-router-dom';

const SingleProject = () => {
  const { id } = useParams();
  const { data: project, error, isLoading } = useGetProjectQuery(id);
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !project) {
    return <div>Error occurred while retrieving data</div>;
  }
  const {
    title,
    subtitle,
    story,
    category,
    faq,
    updates,
    funded,
    expiration,
    goal,
    priceTier1,
    rewardTier1,
  } = project;
  console.log(expiration);
  const date = new Date(expiration).toDateString();

  const handleBackProjectClick = async () => {
    // link to payment page placeholder; need to include project id
  };

  return (
    <div className="single-project">
      <h2 className="title">{title}</h2>
      <p className="subtitle">{subtitle}</p>
      <div className="single-project-content">
        <div className="image-container">
          <img
            src={stock_photo_storefront}
            alt="Stock Photo"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <div className="info-container">
          <section id="pledge">
            <p>
              ${Number(project.funded).toLocaleString()} pledged of $
              {Number(project.goal).toLocaleString()} goal
            </p>
          </section>
          <section className="date-text">
            <div>
              Help Us Reach Our Goal By:<p className="date">{date}</p>
            </div>
          </section>
          <section className="info-tab">
            <InfoTabs />
          </section>
          <Button
            id="pledge-button"
            variant="contained"
            onClick={() => {
                // navigate(`/projects/${id}/pledge`);
                navigate(`/projects/${id}/pledge`, { state: { projectId: id } });
            }}
          >
            Back This Project
          </Button>
          <p id="deadline">
            This project will only be funded if it reaches its goal by {date}.
          </p>
          <p className="category">Category: {category}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
