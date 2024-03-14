import { useGetProjectsQuery } from "./projectSlice";
import Project from "./Project";

function ProjectTable() {
    const { data: projects, error, isLoading } =
    useGetProjectsQuery();
    console.log(useGetProjectsQuery());
    console.log(projects);
    return (
    <div>
        <h1>EXPLORE PROJECTS</h1>
        <div className="all-projects">
        {isLoading && <p>Loading...</p>}
        {error && <p>Something went wrong: {error.message}</p>}
        {projects && projects.map((project) => (
            <Project key={project.id} project={project} />
        ))}
        </div>
    </div>
    );
}

export default ProjectTable;