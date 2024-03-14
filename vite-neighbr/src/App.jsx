import './App.css';
import ProjectTable from './features/projects/projectTable';
import { Route, Routes } from "react-router-dom";
import Fetch from './features/projects/fetch';

function App() {
  const projectRouter = (
    <Routes>
      <Route path="/*" element={<ProjectTable />} />
      <Route path="/*" element={<ProjectTable />} />
    </Routes>
  );
  return projectRouter;
}

export default App;