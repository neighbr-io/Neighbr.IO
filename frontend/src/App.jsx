import './App.css';
import { Route, Routes } from "react-router-dom";
import ProjectContainer from './features/projects/ProjectContainer';
import { Router } from 'react-router-dom';
import { useEffect, useState } from "react";
import Waitlist from './features/waitlist/waitlist';
import NewProjectForm from './features/Registration/NewProjectForm';
import { Navigation, } from "./features";

import {
  Home,
  Projects,
  Faq
} from "./Pages";

import Project from './features/projects/Project';

import '../stripeSrc/stripe.css';
import Payment from '../stripeSrc/Payment';
import Completion from '../stripeSrc/Completion';
import {loadStripe} from '@stripe/stripe-js';


function App() {
  const [ stripePromise, setStripePromise ] = useState(null);


  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch("/api/stripe/config");
        const { publishableKey } = await response.json();
        console.log("publicshablekey",publishableKey);
        setStripePromise(loadStripe(publishableKey));
      }
      catch (error) {
         console.error("config error");
      }
    }

    fetchData();
  }, []);

  
  
  const projectRouter = (
    <>
      <Navigation />
      <Routes>

        <Route path="/"
          element={
            <>
            <Home />
            </>
          } />

        <Route path="/projects/*"
          element={
            <>
              <ProjectContainer />
            </>
          } />

        <Route path="/Faq"
          element={
            <>
              <Faq />
            </>
          } />
        <Route path="/waitlist"
          element={
            <>
              <Waitlist />
            </>
          } />
        <Route path="/newprojectform"
          element={
            <>
              <NewProjectForm />
            </>
          } />
             
      <Route path="/checkout/pay" 
          element={<Payment stripePromise={stripePromise} />} />

      <Route path="/checkout/completion" 
          element={<Completion stripePromise={stripePromise} />} />

      </Routes>
    </>

  );
  return projectRouter;
  // const [searchText, setSearchText] = useState("");
  // const handleSearch = (newSearchText) => {
  //   setSearchText(newSearchText);
  // };
  // return (
  //   <Router>
  //     <div id="project-container">
  //       <ProjectContainer />
  //     </div>
  //   </Router>
  // )
}

export default App;