import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";

// function Fetch() {
//     // useEffect(() => {
//         fetch("https://jsonplaceholder.typicode.com/posts")
//         .then(response => response.json())
//         .then(data => console.log(data))
//     //   },
//     // []);
// }

function Fetch() {
    const [name, setName] = useState([]);

    useEffect(() => {
        names()
    }, [])

    const names = async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        setName(await response.json())
    }
    const navigate = useNavigate();
    return (
        <div>
            <h1>FETCH PLACEHOLDER</h1>
            <div className="all-projects">
                {name.map((data) => {
                    return (
                        <div className="project-preview" key={data.id}>
                            <p className="name"> {data.name} </p>
                            <p className="company"> {data.company.name} </p>
                            <p className="website"> {data.website} </p>
                            <p className="city"> {data.address.city} </p>
                            <Button variant="contained" size="small" sx={{bgcolor: "gray", mx: "auto"}} onClick={() => {
                                alert(`Catch Phrase: ${data.company.catchPhrase}`);
                            }}>See More Details</Button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Fetch;