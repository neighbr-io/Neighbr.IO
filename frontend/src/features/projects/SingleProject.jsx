import {
useGetProjectQuery } from "./projectSlice";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
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
        <p id="pledge">${funded} pledged of ${goal} goal</p>
        <p className="date">Expires: {date}</p>
        <p className="story">Story: {story}</p>
        <p className="category">Category: {categoryId}</p>
        <p className="faq">FAQ: {faq}</p>
        <p className="updates">Updates: {updates}</p>
        <p className="funded">Funded Amount: ${funded}</p>
        <p className="goal">Goal: ${goal}</p>
        <Button id="pledge-button" variant="contained" onClick={() => {
            alert("payment page coming soon!");
        }}>Back This Project</Button>
    </div>
    );
}

export default SingleProject;