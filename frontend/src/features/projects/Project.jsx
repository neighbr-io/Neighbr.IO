import { useState } from "react";
import {
  useDeleteProjectMutation,
  useUpdateProjectMutation } from "./projectSlice";
  import Button from "@mui/material/Button";

/**
 * Displays project information and allows users to either
 * update or delete the project.
 */
function Project({ project }) {
  const [deleteProject] = useDeleteProjectMutation();
  const [updateProject] = useUpdateProjectMutation();

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(project.title);
  const [subtitle, setSubtitle] = useState(project.subtitle);
  const [goal, setGoal] = useState(project.goal);
  const [story, setStory] = useState(project.story);

  function onEdit(event) {
    event.preventDefault();
    if (editing) {
      updateProject({ id: project.id, title, goal });
    }
    setEditing(!editing);
  }

  // const editFields = (
  //   <>
  //     <td>
  //       <input
  //         type="text"
  //         value={title}
  //         onChange={(e) => setTitle(e.target.value)}
  //       />
  //     </td>
  //     <td>
  //       <input
  //         type="text"
  //         value={goal}
  //         onChange={(e) => setGoal(e.target.value)}
  //       />
  //     </td>
  //   </>
  // );

  return (
    <div className="all-projects">
      <div className="project-preview">
        <p className="title">{title}</p>
        <p className="goal">${goal}</p>
        <Button variant="contained" size="small" sx={{bgcolor: "gray", mx: "auto"}} onClick={() => {
            alert(`Project Story: ${story}`);
        }}>See More Details</Button>
      </div>
    </div>
  );
}

export default Project;
