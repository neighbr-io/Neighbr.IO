import {
    useDeleteProjectMutation,
    useUpdateProjectMutation,
    useGetProjectQuery } from "./projectSlice";
import Project from "./Project";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";


const SingleProject = ({ title, subtitle, story, categoryId }) => {
    const { projectId } = useParams();
    const dispatch = useDispatch();

    return (
    <div className="single-project">
        <h2 className="title">{title}</h2>
        <p className="subtitle">{subtitle}</p>
        <p className="story">{story}</p>
        <p className="category">{categoryId}</p>

    </div>
    );
}

export default SingleProject;