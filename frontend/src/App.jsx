import './App.css';
import ProjectTable from './features/projects/projectTable';
import { Route, Routes } from "react-router-dom";
import ProjectContainer from './features/projects/ProjectContainer';
import Waitlist from './features/waitlist/waitlist';
import { Router } from 'react-router-dom';
import { useEffect, useState } from "react";
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
    <Routes>
      {/* <Route path="/*" element={<ProjectTable />} /> */}
      <Route path="/*" element={<ProjectContainer />} />
      <Route path="/waitlist" element={<Waitlist />} />
      <Route path="/checkout/pay" element={<Payment stripePromise={stripePromise} />} />
      <Route path="/checkout/completion" element={<Completion stripePromise={stripePromise} />} />
    </Routes>
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