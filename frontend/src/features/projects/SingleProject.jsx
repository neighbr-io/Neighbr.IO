import {
    useGetProjectQuery } from "./projectSlice";
import { useState } from "react";
import { useParams } from "react-router-dom";

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

    return (
    <div className="single-project">
        <h2 className="title">{title}</h2>
        <p className="subtitle">{subtitle}</p>
        <p className="story">Story: {story}</p>
        <p className="category">Category: {categoryId}</p>
        <p className="faq">FAQ: {faq}</p>
        <p className="updates">Updates: {updates}</p>
        <p className="funded">Funded Amount: ${funded}</p>
        <p className="expiration">Expires: {expiration}</p>
        <p>Goal: ${goal}</p>

    </div>
    );
}

export default SingleProject;