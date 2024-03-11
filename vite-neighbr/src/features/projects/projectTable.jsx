import { useGetProjectsQuery } from "./projectSlice";
import Project from "./Project";

function ProjectTable() {
    const { data: projects, error, isLoading } =
    useGetProjectsQuery();
    console.log(useGetProjectsQuery());
    return (
    <>
        <h1>Projects</h1>
        
        {isLoading && <p>Loading...</p>}
        {error && <p>Something went wrong: {error.message}</p>}
        {projects && projects.map((project) => (
            <Project key={project.id} project={project} />
        ))}
    </>
    );
}

export default ProjectTable;