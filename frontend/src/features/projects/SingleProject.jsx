import { useGetProjectQuery } from "./projectSlice";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
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
import { useNavigate } from "react-router-dom";
import Pledge from "./Pledge";

const SingleProject = () => {
  const { id } = useParams();
  const { data: project, error, isLoading } = useGetProjectQuery(id);

  // const navigate = useNavigate();
  const [showPledge, setShowPledge] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !project) {
    return <div>Error occurred while retrieving data</div>;
  }

  const handleBackProjectClick = async () => {
    setShowPledge(!showPledge);
  };

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
          <p id="deadline">
            This project will only be funded if it reaches its goal by {date}.
          </p>
          <p className="category">Category: {category}</p>
          <Button
            id="pledge-button"
            variant="contained"
            onClick={handleBackProjectClick}
            startIcon={showPledge ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
          >
            Back This Project
          </Button>
          <hr/>
          {/* Conditionally render the pledge section */}
          {showPledge && (
            <div id="pledge-section">
               <Pledge id={id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProject;
