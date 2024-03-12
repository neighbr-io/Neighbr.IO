import './App.css';
import ProjectTable from './features/projects/projectTable';
import { Route, Routes } from "react-router-dom";

function App() {
  const projectRouter = (
    <Routes>
      <Route path="/*" element={<ProjectTable />} />
    </Routes>
  );
  return projectRouter;
}

export default App;