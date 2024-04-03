import React from "react";
import cityImage from "../../image/city-horizon.png";
import waitlistIcon from "../../image/waitlist-icon.png";
import exploreIcon from "../../image/explore-icon.png";

const Hero = () => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Welcome to Neighbor.io</h1>
      <img src={cityImage} style={{ width: "100%" }} />
      {/* waitlist button */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20%" }}>
        <a href="/projects">
          <img src={exploreIcon} style={{ height: "50px" }} alt="Projects" />
        </a>
        <a href="/waitlist">
          <img src={waitlistIcon} style={{ height: "50px" }} alt="Waitlist" />
        </a>
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
