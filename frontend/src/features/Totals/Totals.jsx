import { useGetProjectsQuery } from "../projects/projectSlice";

function Totals() {

    if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (error || !projects) {
        return <div>Error occurred while retrieving data</div>;
      }

      console.log("data", projects);

    const { data: projects, error, isLoading } = useGetProjectsQuery();

    const totalFunded = projects.reduce((acc, project) => acc + Number(project.funded), 0);

    return (
        <>
            <div>

                <h2>{projects.length()} Businesses Backed</h2>
                <h2>{totalFunded.toLocaleString()} Pledged to Businesses</h2>

            </div>
        </>
    );
};

export default Totals;
