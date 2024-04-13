import React from "react";
import { useNavigate } from "react-router-dom";
import cityImage from "../../image/city-horizon.png";
import waitlistIcon from "../../image/waitlist-icon.png";
import exploreIcon from "../../image/explore-icon.png";

const Hero = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle navigation
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Welcome to Neighbor.io</h1>
      <img src={cityImage} style={{ width: "100%" }} />
      <div style={{ display: "flex", justifyContent: "center", gap: "20%" }}>
        {/* Use div or button for navigation */}
        <div onClick={() => handleNavigate('/projects')}>
          <img src={exploreIcon} style={{ height: "50px", cursor: "pointer" }} alt="Projects" />
        </div>
        <div onClick={() => handleNavigate('/waitlist')}>
          <img src={waitlistIcon} style={{ height: "50px", cursor: "pointer" }} alt="Waitlist" />
        </div>
      </div>
      <p>
        *Please note: This website currently utilizes demonstration data, not
        actual data, for illustrative purposes only.
      </p>
      <hr />
    </>
  );
};

export default Hero;
