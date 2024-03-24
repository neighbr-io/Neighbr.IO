import './App.css';
import ProjectTable from './features/projects/projectTable';
import { Route, Routes } from "react-router-dom";
import ProjectContainer from './features/projects/ProjectContainer';
import { Router } from 'react-router-dom';
import { useState } from "react";

import {
  Navigation,
  SignIn
} from "./features";

import {
  Home,
  Projects,
  Faq
} from "./Pages";
import Project from './features/projects/Project';


function App() {
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

        {/* <Route path="/SignIn"
          element={
            <>
              <SignIn />
            </>
          } /> */}

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