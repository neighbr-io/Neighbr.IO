import React, { useState } from "react";
import "./HowItWorks.css";

const HowItWorks = () => {
  return (
    <>
      <div className="how-it-works">
        <h4 style={{ color: "black" }}>How It Works</h4>
        <p style={{ textAlign: "left", color: "black" }}>
          At Neighbr.io, we've simplified the path to mutual success and
          community strength through a unique pledge system. Here’s how it
          unfolds:
        </p>

        <ol className="how-it-works-list">
          <li>
            <h1 style={{ fontSize: "40pt" }}>1</h1>
            <p style={{ textAlign: "left" }}>
              <strong>Pledge & Support:</strong> Community members, like you,
              pledge financial support to local businesses through Neighbr.io.
              This isn’t a loan; it’s a vote of confidence in the potential of
              neighborhood businesses.
            </p>
          </li>
          <li>
            <h1 style={{ fontSize: "40pt" }}>2</h1>
            <p style={{ textAlign: "left" }}>
              <strong>Offer & Thank: </strong> In return for your pledge,
              businesses don’t pay back with money plus interest. Instead, they
              offer their services or products as a heartfelt expression of
              gratitude, most definitely with a big discount!
            </p>
          </li>
          <li>
            <h1 style={{ fontSize: "40pt" }}>3</h1>
            <p style={{ textAlign: "left" }}>
              <strong>Strengthen & Grow:</strong> This exchange fosters a robust
              ecosystem where businesses grow without the burden of financial
              debt, and supporters enjoy local services, enriching the community
              bond.
            </p>
          </li>
        </ol>

        <p style={{ textAlign: "left", color: "black" }}>
          Each pledge brings us closer, weaving a tighter, more supportive
          neighborhood fabric where businesses flourish with the community's
          backing, and every service exchanged is a story of shared growth and
          gratitude. Join Neighbr.io, and be part of this innovative journey
          towards a thriving, interconnected community.
        </p>
      </div>
      <hr />
    </>
  );
};

export default HowItWorks;
