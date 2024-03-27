import { useAddProjectMutation } from "../projects/projectSlice";
import "./NewProjectForm.css";
import Button from "@mui/material/Button";
import { useState } from "react";

function NewProjectForm() {
    const [addProject] = useAddProjectMutation();
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem("bearerToken")));
    const token = localStorage.getItem("bearerToken");
    console.log("User token:", token);

    async function onSubmit(event) {
        event.preventDefault();

        const title = event.target.title.value;
        const subtitle = event.target.subtitle.value;
        const category = event.target.category.value;
        const story = event.target.story.value;
        const faq = event.target.faq.value;
        const goal = parseInt(event.target.goal.value, 10);
        const expiration = event.target.expiration.value;
        const priceTier1 = parseInt(event.target.priceTier1.value, 10);
        const rewardTier1 = event.target.rewardTier1.value;

        if (title && subtitle && category && story && faq && !isNaN(goal) && expiration && !isNaN(priceTier1) && rewardTier1) {
            await addProject ({ title, subtitle, category, story, faq, goal, expiration, priceTier1, rewardTier1,}).unwrap();
            event.target.reset();
        } else {
            console.log("Please provide all required fields.")
        }

    }
    return (
        <section>
          <h1>New Project Request</h1>
          <form onSubmit={onSubmit}>
            <div id="new-project-form">
                <label className="label">Business Name:<input type="text" name="businessName" placeholder="placeholder"/></label>
                <label className="label">Business Address Street Number:<input type="text" name="houseNumber" placeholder="placeholder"/></label>
                <label className="label">Street Name:<input type="text" name="street" placeholder="placeholder"/></label>
                <label className="label">City:<input type="text" name="city" placeholder="placeholder"/></label>
                <label className="label">State:<input type="text" name="state" placeholder="placeholder"/></label>
                <label className="label">Zip Code:<input type="text" name="zipcode" placeholder="placeholder"/></label>
                <label className="label">Project Name:<input type="text" name="title" placeholder="Name of Project"/></label>
                <label className="label">Catchy Tagline:<input type="text" name="subtitle" placeholder="Subtitle"/></label>
                {/* <label className="label">Category:<input type="text" name="category" placeholder="Category"/></label> */}
                <label className="label">Category:</label>
                    <select name="categories" id="category">
                        <option value="select">Select a Category</option>
                        <option value="Arts and Craft">Arts and Craft</option>
                        <option value="Auto Mechanic">Auto Mechanic</option>
                        <option value="Bakery">Bakery</option>
                        <option value="Barbershop and Salon">Barbershop and Salon</option>
                        <option value="Coffee Shop">Coffee Shop</option>
                        <option value="Education and Bookstore">Education and Bookstore</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Grocery Store">Grocery Store</option>
                        <option value="Gym">Gym</option>
                        <option value="Nursery">Nursery</option>
                        <option value="Pet Grooming and Supplies">Pet Grooming and Supplies</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Wine and Spirits">Wine and Spirits</option>
                        <option value="Other">Other</option>
                    </select>
                <label className="label" htmlFor="story">Short Description of Your Project:<textarea id="story" name="story" rows="5" cols="100" placeholder="Story"/></label>
                <label className="label-number">Tier 1 Reward Price:<input type="number" name="priceTier1" placeholder="Input Whole Number (no symbols)"/></label>
                <label className="label">Tier 1 Reward:<input type="text" name="rewardTier1" placeholder="Tier 1 Reward Details"/></label>
                <label className="label" htmlFor="faq">FAQs:<textarea id="faq" name="faq" rows="2" placeholder="Frequently Asked Questions"/></label>
                <label className="label-number">Funding Goal:<input type="number" name="goal" placeholder="Input Whole Number (no symbols)"/></label>
                <label className="label-date">Project Deadline:<input type="datetime-local" name="expiration" /></label>
                <button type="submit" className="button">SUBMIT</button>
            </div>
          </form>
        </section>
      );
}

export default NewProjectForm;