import { useGetProjectsQuery, useGetProjectQuery } from "./projectSlice";
import SingleProject from "./SingleProject";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import ProjectTable from "./projectTable";
import Project from "./Project";

function ProjectContainer() {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [story, setStory] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [faq, setFaq] = useState("");
    const [updates, setUpdates] = useState("");
    const [funded, setFunded] = useState("");
    const [expiration, setExpiration] = useState("");
    const [goal, setGoal] = useState("");

    return(
        <Routes>
            <Route path='/' element={ <Project title={title} setTitle={setTitle} 
            subtitle={subtitle} setSubtitle={setSubtitle}
            /> } />
            <Route path='/:id' element={<SingleProject title={title} setTitle={setTitle} 
            subtitle={subtitle} setSubtitle={setSubtitle}
            story={story} setStory={setStory}
            categoryId={categoryId} setCategoryId={setCategoryId}
            />} />
        </Routes>
    );
}

export default ProjectContainer;

