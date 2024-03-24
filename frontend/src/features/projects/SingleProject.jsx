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
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import InfoTabs from "./SingleProjectTab";

import { useGetProjectQuery } from "./projectSlice";
import "./SingleProject.css";

const SingleProject = () => {
    const { id } = useParams();
    const { data: project, error, isLoading } = useGetProjectQuery(id);
    
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (error || !project) {
        return <div>Error occurred while retrieving data</div>;
    }
    const { title, subtitle, story, category, faq, updates, funded, expiration, goal } = project;
    console.log(expiration);
    const date = new Date(expiration).toDateString();

    const handleBackProjectClick = async () => {
        // Fetch backend endpoint to create a checkout session
        // const response = await fetch('/api/payment/create-checkout-session', { method: 'POST' });
        // const data = await response.json();

        // if (response.ok) {
        //     // Redirect to Stripe's hosted checkout page
        //     window.location.href = data.url;
        // } else {
        //     alert('Failed to initiate payment.');
        // }
        // open checkout on another page 
    };

    return (
    <div className="single-project">
        <h2 className="title">{title}</h2>
        <p className="subtitle">{subtitle}</p>
        <section id="pledge">
        <p>${funded} pledged of ${goal} goal</p>
        </section>
        <section className="date-text"><div>Help Us Reach Our Goal By:<p className="date">{date}</p></div></section>
        <section className="info-tab"><InfoTabs /></section>
        <Button id="pledge-button" variant="contained" onClick={() => {
            alert("payment page coming soon!");
        }}>Back This Project</Button>
        <p id="deadline">This project will only be funded if it reaches its goal by {date}.</p>
        <p className="category">Category: {category}</p>

    </div>
    );
};

export default SingleProject;
