import SingleProject from "./SingleProject";
import { Routes, Route } from "react-router-dom";
import Project from "./Project";
import Payment from "../../../stripeSrc/Payment";
import Pledge from "./Pledge";
import {
    PaymentElement,
    useStripe,
    useElements
  } from "@stripe/react-stripe-js";

function ProjectContainer() {

    return(

        <Routes>
            <Route path='/' element={ <Project 
            /> } />
            <Route path='/:id' element={<SingleProject 
            />} />
            <Route path='/:id/pledge' element={<Pledge
            />} />
        </Routes>
    );
}

export default ProjectContainer;

