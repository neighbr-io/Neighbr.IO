import React, { useState } from "react";
import "./waitlist.css";

const Waitlist = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      if (response.ok) {
        alert(data.message); 
        setEmail(''); 
      } else {
        alert("Error: " + data.message); 
      }
    } catch (error) {
      console.error("Failed to submit email to waitlist:", error);
      alert("Failed to submit email. Please try again later.");
    }
  };
  

  return (
    <div className="waitlist-container">
      {/* <h1 style={{ fontSize: "40pt", color: "white" }}>Neighbr.io</h1> */}
      <h2 className="waitlist-signup"> WAITLIST SIGNUP</h2>
      <h1>Empower Dreams, Strengthen Community: Your Services, Our Support!</h1>
      <p>
        Welcome to Neighbr.io, a vibrant space where small business owners find
        the support they need, not with loans, but through community pledges.
        Your services become the heartfelt thank-you to those who believe in
        your dream. Here, each donation is more than aid; it's a belief in your
        potential to enrich our neighborhood. By joining, you're not just
        receiving support; you're weaving yourself into the fabric of our
        community, offering your skills and love as the currency of gratitude.
        Neighbr.io is where your growth and community spirit flourish together,
        transforming support into a shared success story. Join us in shaping a
        neighborhood where every service is a testament to unity and mutual
        progress.
      </p>
      <form className="waitlist-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="waitlist-button" type="submit">
          SIGNUP
        </button>
      </form>
      <div className="how-it-works">
      <h1 style={{color: "black"}}>How Does It Work</h1>
      <p style={{ textAlign: "left", color:"black"}}>
        At Neighbr.io, we've simplified the path to mutual success and community
        strength through a unique pledge system. Here’s how it unfolds:
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

      <p style={{ textAlign: "left", color: "black"}}>
        Each pledge brings us closer, weaving a tighter, more supportive
        neighborhood fabric where businesses flourish with the community's
        backing, and every service exchanged is a story of shared growth and
        gratitude. Join Neighbr.io, and be part of this innovative journey
        towards a thriving, interconnected community.
      </p>
      </div>
    </div>
  );
};

export default Waitlist;
