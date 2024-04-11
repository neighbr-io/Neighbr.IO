import * as React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import { Grid } from "@mui/material";
import { useAddProjectMutation } from "../projects/projectSlice";
import { useAddLocationMutation } from "../projects/locationSlice";
import Alert from '@mui/material/Alert';


const steps = [
  {
    label: "Tell us about your business",
    description: `It is important for the community members to know a little bit about your business. Please provide your business name and address.`,
    text: "* indicates required field",
    form: (formData, setFormData) => (
      <>
        <TextField
          required
          fullWidth
          label="Business Name"
          value={formData.businessName || ""}
          onChange={(e) =>
            setFormData({ ...formData, businessName: e.target.value })
          }
          margin="normal"
        />
        <Grid container>
          <Grid item xs={4}>
            <TextField
              required
              style={{ paddingRight: "10px", width: "120px" }}
              label="Number"
              value={formData.houseNumber || ""}
              onChange={(e) =>
                setFormData({ ...formData, houseNumber: e.target.value })
              }
              margin="normal"
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              required
              style={{ width: "245px" }}
              label="Street Name"
              value={formData.street || ""}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
              margin="normal"
            />
          </Grid>
        </Grid>
        <TextField
          required
          fullWidth
          label="City"
          value={formData.city || ""}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          margin="normal"
        />
        <Grid container>
          <Grid item xs={4}>
            <TextField
              required
              style={{ paddingRight: "10px", width: "120px" }}
              label="State"
              value={formData.state || ""}
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              style={{ width: "150px" }}
              label="Zip Code"
              value={formData.zipcode || ""}
              onChange={(e) =>
                setFormData({ ...formData, zipcode: e.target.value })
              }
              margin="normal"
            />
          </Grid>
        </Grid>
      </>
    ),
  },
  {
    label: "Tell us about your project",
    description:
      "Please be as specific as possible about the project you have in mind. ",
    text: "* indicates required field",
    form: (formData, setFormData) => (
      <>
        <TextField
          required
          fullWidth
          label="Project Title"
          value={formData.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          margin="normal"
        />
        <TextField
          required
          fullWidth
          label="Tagline"
          multiline
          rows={2}
          value={formData.subtitle || ""}
          onChange={(e) =>
            setFormData({ ...formData, subtitle: e.target.value })
          }
          margin="normal"
        />
        <TextField
          required
          select
          fullWidth
          label="Category"
          value={formData.category || ""}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          margin="normal"
        >
          <MenuItem value="Arts and Craft"> Arts and Craft</MenuItem>
          <MenuItem value="Auto Mechanic">Auto Mechanic</MenuItem>
          <MenuItem value="Bakery">Bakery</MenuItem>
          <MenuItem value="Barbershop and Salon">Barbershop and Salon</MenuItem>
          <MenuItem value="Coffee Shop">Coffee Shop</MenuItem>
          <MenuItem value="Education and Bookstore">
            Education and Bookstore
          </MenuItem>
          <MenuItem value="Entertainment">Entertainment</MenuItem>
          <MenuItem value="Grocery Store">Grocery Store</MenuItem>
          <MenuItem value="Gym">Gym</MenuItem>
          <MenuItem value="Nursery">Nursery</MenuItem>
          <MenuItem value="Pet Grooming and Supplies">
            Pet Grooming and Supplies
          </MenuItem>
          <MenuItem value="Restaurant">Restaurant</MenuItem>
          <MenuItem value="Wine and Spirits">Wine and Spirits</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
        <TextField
          required
          fullWidth
          label="Description"
          multiline
          rows={2}
          value={formData.story || ""}
          onChange={(e) => setFormData({ ...formData, story: e.target.value })}
          margin="normal"
        />
        <TextField
          required
          fullWidth
          label="Frequently Asked Questions"
          multiline
          rows={3}
          value={formData.faq || ""}
          onChange={(e) => setFormData({ ...formData, faq: e.target.value })}
          margin="normal"
        />
        <TextField
          required
          fullWidth
          label="Funding Goal (max: $10,000)"
          type="number"
          value={formData.goal || ""}
          onChange={(e) =>
            setFormData({ ...formData, goal: parseInt(e.target.value) })
          }
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputProps: {min: 1, max:10000}
          }}
        />

        <TextField
          required
          fullWidth
          InputProps={{
            startAdornment: " ",
          }}
          type="datetime-local"
          label="Deadline"
          value={formData.expiration || ""}
          onChange={(e) =>
            setFormData({ ...formData, expiration: e.target.value })
          }
          margin="normal"
        />
      </>
    ),
  },
  {
    label: "Rewards to the pledgers",
    description: `Tell us how you would like to reward pledgers. Neighbr.io provides a tiered rewards system where you can come up with between 1-3 tiers of rewards, each with different pledging amount.`,
    text: "* indicates required field",
    form: (formData, setFormData) => (
      <>
        <TextField
          required
          fullWidth
          type="number"
          label="Tier 1 Reward Amount (max: $500)"
          value={formData.priceTier1 || ""}
          onChange={(e) =>
            setFormData({ ...formData, priceTier1: parseInt(e.target.value) })
          }
          margin="normal"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputProps: {min: 1, max: 500},
          }}
        />
        <TextField
          required
          fullWidth
          label="Tier 1 Reward Description"
          multiline
          rows={2}
          value={formData.rewardTier1 || ""}
          onChange={(e) =>
            setFormData({ ...formData, rewardTier1: e.target.value })
          }
          margin="normal"
        />
        <TextField
          fullWidth
          label="Tier 2 Reward Amount"
          value={formData.priceTier2 || ""}
          onChange={(e) =>
            setFormData({ ...formData, priceTier2: parseInt(e.target.value) })
          }
          margin="normal"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          fullWidth
          label="Tier 2 Reward Description"
          multiline
          rows={2}
          value={formData.rewardTier2 || ""}
          onChange={(e) =>
            setFormData({ ...formData, rewardTier2: e.target.value })
          }
          margin="normal"
        />
        <TextField
          fullWidth
          label="Tier 3 Reward Amount"
          value={formData.priceTier3 || ""}
          onChange={(e) =>
            setFormData({ ...formData, priceTier3: parseInt(e.target.value) })
          }
          margin="normal"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          fullWidth
          label="Tier 3 Reward Description"
          multiline
          rows={2}
          value={formData.rewardTier3 || ""}
          onChange={(e) =>
            setFormData({ ...formData, rewardTier3: e.target.value })
          }
          margin="normal"
        />
      </>
    ),
  },
];

export default function NewProjectForm() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [formData, setFormData] = React.useState({});
  const maxSteps = steps.length;

  const [createProject] = useAddProjectMutation();
  const [createLocation] = useAddLocationMutation();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    
  //   const {
  //     title,
  //     subtitle,
  //     category, // This is the category name, not the ID
  //     story,
  //     faq,
  //     goal,
  //     expiration,
  //     priceTier1,
  //     rewardTier1,
  //     funded, // optional
  //     updates // optional
  // } = req.body;
    
    
    console.log(formData);
    try {
      const projectData = {
        title: formData.title,
        subtitle: formData.subtitle,
        category: formData.category,
        story: formData.story,
        faq: formData.faq,
        goal: parseInt(formData.goal),
        expiration: new Date(formData.expiration).toISOString(),
        priceTier1: parseInt(formData.priceTier1),
        rewardTier1: formData.rewardTier1,
        priceTier2: formData.priceTier2 ? parseInt(formData.priceTier2) : null,
        rewardTier2: formData.rewardTier2 || null,
        priceTier3: formData.priceTier3 ? parseInt(formData.priceTier3) : null,
        rewardTier3: formData.rewardTier3 || null,
        status: "draft", 
      };
      const locationData = {
        businessName: formData.businessName,
        houseNumber: formData.houseNumber,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipcode: formData.zipcode,
      };

      await createProject(projectData).unwrap();
      createLocation(locationData).unwrap();
      console.log("Project created successfully");
      alert("Project submitted successfully");
    } catch (error) {
      console.error("Error creating project:", error);
      alert(error.data);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      >
        <Typography>{steps[activeStep].label}</Typography>
      </Paper>
      <Box sx={{ color: "#635bff", maxWidth: 400, width: "100%", p: 2 }}>
        {steps[activeStep].description}

      </Box>
      <Box sx={{ fontSize: 16, maxHeight: 750, maxWidth: 400, width: "100%", p: 2 }}>
        {steps[activeStep].text}
        {steps[activeStep].form(formData, setFormData)}
      </Box>
    
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={activeStep === maxSteps - 1 ? handleSubmit : handleNext}
          >
            {activeStep === maxSteps - 1 ? "Submit" : "Next"}
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            Back
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
          </Button>
        }
      />
    </Box>
  );
}
