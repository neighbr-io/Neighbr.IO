import { useState } from "react";
import {
  useDeleteProjectMutation,
  useUpdateProjectMutation } from "./projectSlice"

/**
 * Displays student information and allows users to either
 * update or delete the student.
 */
function Project({ project }) {
  const [deleteProject] = useDeleteProjectMutation();
  const [updateProject] = useUpdateProjectMutation();

  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(project.title);
  const [subtitle, setSubtitle] = useState(project.subtitle);

  function onEdit(event) {
    event.preventDefault();
    if (editing) {
      updateProject({ id: project.id, title, subtitle });
    }
    setEditing(!editing);
  }

  const editFields = (
    <>
      <td>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
      </td>
    </>
  );

  return (
    <tr>
      {editing ? (
        editFields
      ) : (
        <>
          <td>{title}</td>
          <td>{subtitle}</td>
        </>
      )}
      <td>
        <button onClick={onEdit}>{editing ? "Save" : "Edit"}</button>
        <button onClick={() => deleteProject(project.id)}>Delete</button>
      </td>
    </tr>
  );
}

export default Project;
