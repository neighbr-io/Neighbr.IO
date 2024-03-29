import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Rewards.css";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useGetProjectQuery } from "../src/features/projects/projectSlice";
import { useParams } from "react-router-dom";

function Payment(props) {
  // for stripe payment
  const { stripePromise } = props;
  const [clientSecret, setClientSecret] = useState("");

  // For retreiving Tier rewards
  const location = useLocation();
  const id = location.state?.projectId;
  // console.log("projectId: ", id);
  const { data: project, error, isLoading } = useGetProjectQuery(id);
  
  // For selecting the package to asign checkout amount
  const [checkoutAmount, setCheckoutAmount] = useState(0);
  const handleSelectTier = (price) => {
    console.log(price);
    setCheckoutAmount(price);
  };

  useEffect(() => {
    fetch("/api/stripe/create-payment-intent", {
      method: "GET",
      headers: {
        // check for header requirement
        "Content-Type": "application/json",
      },
      // Include any other fetch options required by your setup
    })
      .then((res) => {
        console.log("Response: ", res);
        return res.json();
      })
      .then((data) => {
        const { clientSecret } = data;
        setClientSecret(clientSecret);
      })
      .catch((error) => {
        console.error("Error fetching payment intent:", error);
        // Error handling
      });
  }, []);

  return (
    <>
      <div className="rewards-container">
        {project && (
          <>
            <div className="reward-card"  onClick={() => handleSelectTier(project.priceTier1)}>
              <h3>Tier 1</h3>
              <p>Price: ${project.priceTier1}</p>
              <p>Reward: {project.rewardTier1}</p>
            </div>
            {project.priceTier2 && (
              <div className="reward-card" onClick={() => handleSelectTier(project.priceTier2)}>
                <h3>Tier 2</h3>
                <p>Price: ${project.priceTier2}</p>
                <p>Reward: {project.rewardTier2}</p>
              </div>
            )}
            {project.priceTier3 && (
              <div className="reward-card" onClick={() => handleSelectTier(project.priceTier3)}>
                <h3>Tier 3</h3>
                <p>Price: ${project.priceTier3}</p>
                <p>Reward: {project.rewardTier3}</p>
              </div>
            )}
          </>
        )}
      </div>
      <h1>Payment</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
