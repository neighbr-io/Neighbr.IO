import {
    useGetProjectQuery } from "./projectSlice";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import "./SingleProject.css";


const SingleProject = () => {
    const { id } = useParams();
    const { data: project, error, isLoading } = useGetProjectQuery(id);
    if (isLoading) {
        return <div>Loading...</div>;
    }
    
    if (error || !project ) {
        return <div>Error occurred while retrieving data </div>;
    }
    const { title, subtitle, story, categoryId, faq, updates, funded, expiration, goal } = project;
    console.log(expiration);
    const date = new Date(expiration).toDateString();
    console.log(date);

    return (
    <div className="single-project">
        <h2 className="title">{title}</h2>
        <p className="subtitle">{subtitle}</p>
        <section id="pledge">
        <p>${funded} pledged of ${goal} goal</p></section>
        <section className="date"><p>Expires: {date}</p></section>
        
        <p className="story">Story: {story}</p>
        <p className="faq">FAQ: {faq}</p>
        <p className="updates">Updates: {updates}</p>
        <p className="category">Category: {categoryId}</p>
        <Button id="pledge-button" variant="contained" onClick={() => {
            alert("payment page coming soon!");
        }}>Back This Project</Button>

    </div>
    );
}

export default SingleProject;