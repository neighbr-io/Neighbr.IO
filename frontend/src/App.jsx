import './App.css';
import ProjectTable from './features/projects/projectTable';
import { Route, Routes } from "react-router-dom";
import ProjectContainer from './features/projects/ProjectContainer';
import Waitlist from './features/waitlist/waitlist';
import { Router } from 'react-router-dom';
import { useState } from "react";

function App() {
  const projectRouter = (
    <Routes>
      {/* <Route path="/*" element={<ProjectTable />} /> */}
      <Route path="/*" element={<ProjectContainer />} />
      <Route path="/waitlist" element={<Waitlist />} />
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