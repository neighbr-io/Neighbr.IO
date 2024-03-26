import SingleProject from "./SingleProject";
import { Routes, Route } from "react-router-dom";
import Project from "./Project";

function ProjectContainer() {

    return(

        <Routes>
            <Route path='/' element={ <Project 
            /> } />
            <Route path='/:id' element={<SingleProject 
            />} />
        </Routes>
    );
}

export default ProjectContainer;

