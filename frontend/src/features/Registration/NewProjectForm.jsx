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
        const goal = event.target.goal.value;
        const expiration = event.target.expiration.value;

        if (title && subtitle && category && story && faq && goal && expiration) {
            await addProject ({ title, subtitle, category, story, faq, goal, expiration,
                options: {
                    headers: {
                        //Basic Auth Header example
                        'Authorization': `Bearer ${token}`
                    }
                } 
            });
            event.target.reset();
        }

    }
    return (
        <section>
          <h1>New Project Request</h1>
          <form onSubmit={onSubmit}>
            <div id="new-project-form">
                <label className="label">Project Name:<input type="text" name="title" placeholder="Title"/></label>
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
                <label className="label" htmlFor="faq">FAQs:<textarea id="faq" name="faq" rows="2" placeholder="Frequently Asked Questions"/></label>
                <label className="label">Funding Goal:<input type="number" name="goal" placeholder="Input Whole Dollar Amount (no symbols)"/></label>
                <label className="label">Project Deadline:<input type="datetime-local" name="expiration" /></label>
                <button type="submit" className="button">SUBMIT</button>
            </div>
          </form>
        </section>
      );
}

export default NewProjectForm;