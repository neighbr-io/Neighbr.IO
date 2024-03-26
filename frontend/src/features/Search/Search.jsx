import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

function SearchBar({ onSearch }) {
  
  const [localSearchText, setLocalSearchText] = useState("");

  const handleInputChange = (e) => {
    const newSearchText = e.target.value;
    console.log("Search Bar Text:", newSearchText);
    setLocalSearchText(newSearchText); 
    onSearch(newSearchText); 
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={localSearchText} // Bind input to local state
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchBar;