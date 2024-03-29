import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import styled from "@emotion/styled";
import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useGetProjectsQuery } from "../projects/projectSlice";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const HoverTypography = styled(Typography)(({ theme }) => ({
  '&:hover': {
    color: theme.palette.secondary.main,
    cursor: 'pointer',
  },
}));

function SearchBar({ onSearch }) {

  const { data: projects, isLoading, error } = useGetProjectsQuery();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredProjects = projects?.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred: {error.toString()}</div>;

  return (
    <>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search..."
          inputProps={{ "aria-label": "search" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoComplete="off"
        />
      </Search>
   
        {searchQuery && filteredProjects.length > 0 && (
          <div className="dropdown">
            {filteredProjects.map(project => (
              <div key={project.id} className="dropdown-row"
              onClick={() => navigate(`/projects/${project.id}`)} // Optional: Change the input to the selected project name
              >
                {project.title}
              </div>
            ))}
         </div>
        )}
 
    </>
  );
}

export default SearchBar;