import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProjectQuery } from "./projectSlice";
import { useParams } from "react-router-dom";
import "./Pledge.css";

function Pledge( {id} ) {

  const { data: project, error, isLoading } = useGetProjectQuery(id);

  // For selecting the package to asign checkout amount and track the selected tier
  const [selectedTier, setSelectedTier] = useState(null);

  const navigate = useNavigate();

  const handleSelectTier = (tier, price) => {
    console.log(price);
    setSelectedTier({ tier, price });
  };

  return (
    <div className="rewards-container">
      {project && (
        <>
          <div
            className="reward-card"
            onClick={() => handleSelectTier("Tier 1", project.priceTier1)}
          >
            <h3>Tier 1</h3>
            <p>Price: ${project.priceTier1}</p>
            <p>Reward: {project.rewardTier1}</p>
            {selectedTier?.tier === "Tier 1" && (
              <button
                className="pledge-button"
                onClick={() => {
                  // navigate(`/checkout/pay`);
                  window.open('https://buy.stripe.com/test_14k7voabo8Ygf7OdQR', '_blank');
                }}
              >
                Pledge ${selectedTier.price}
              </button>
            )}
          </div>
          {project.priceTier2 && (
            <div
              className="reward-card"
              onClick={() => handleSelectTier("Tier 2", project.priceTier2)}
            >
              <h3>Tier 2</h3>
              <p>Price: ${project.priceTier2}</p>
              <p>Reward: {project.rewardTier2}</p>
              {selectedTier?.tier === "Tier 2" && (
                <button
                  className="pledge-button"
                  onClick={() => {
                    // navigate(`/checkout/pay`);
                    window.open('https://buy.stripe.com/test_14k7voabo8Ygf7OdQR', '_blank');
                  }}
                >
                  Pledge ${selectedTier.price}
                </button>
              )}
            </div>
          )}
          {project.priceTier3 && (
            <div
              className="reward-card"
              onClick={() => handleSelectTier("Tier 3", project.priceTier3)}
            >
              <h3>Tier 3</h3>
              <p>Price: ${project.priceTier3}</p>
              <p>Reward: {project.rewardTier3}</p>
              {selectedTier?.tier === "Tier 3" && (
                <button
                  className="pledge-button"
                  onClick={() => {
                    // navigate(`/checkout/pay`);
                    window.open('https://buy.stripe.com/test_14k7voabo8Ygf7OdQR', '_blank');
                  }}
                >
                  Pledge ${selectedTier.price}
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Pledge;
