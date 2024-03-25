import React, { useState } from "react";
import './App.css';
import { Route, Routes } from "react-router-dom";


import {
  Navigation,
} from "./features";

import {
  Home,
  Projects,
  Faq
} from "./Pages";
import Project from './features/projects/Project';


function App() {

  const [searchText, setSearchText] = useState("");

  const handleSearch = (newSearchText) => {
    setSearchText(newSearchText);
  };

  const projectRouter = (
    <>
      <Navigation onSearch={handleSearch} />
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
              <Projects />
            </>
          } />

        <Route path="/Faq"
          element={
            <>
              <Faq />
            </>
          } />

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