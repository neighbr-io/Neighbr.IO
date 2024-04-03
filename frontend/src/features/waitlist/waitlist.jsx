import React, { useState } from "react";
import "./waitlist.css";

const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // change to { email, role } once table is updated
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
        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="" disabled>Who are you?</option>
          <option value="business_owner">Business Owner</option>
          <option value="neighbor">Just a Neighbor</option>
          <option value="both">Both</option>
        </select>
        <button className="waitlist-button" type="submit">
          SIGNUP
        </button>
      </form>
    </div>
  );
};

export default Waitlist;
