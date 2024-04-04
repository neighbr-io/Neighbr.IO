import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import TextField from "@mui/material/TextField"; 

const steps = [
  {
    label: 'Tell us about your business',
    description: `It is important for the community members to know a little bit about your business. Please provide your business name and address.`,
    form: (formData, setFormData) => (
      <>
        <TextField
          fullWidth
          label="Business Name"
          value={formData.businessName || ''}
          onChange={e => setFormData({ ...formData, businessName: e.target.value })}
          margin="normal"
        />
        <TextField
          width="15%"
          alignItems="left"
          label="Street Number"
          value={formData.houseNumber || ''}
          onChange={e => setFormData({ ...formData, houseNumber: e.target.value })}
          margin="normal"
        />
        <TextField
          width="75%"
          position="right"
          label="Street Name"
          value={formData.street || ''}
          onChange={e => setFormData({ ...formData, street: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="City"
          value={formData.city || ''}
          onChange={e => setFormData({ ...formData, city: e.target.value })}
          margin="normal"
        />
        <TextField
          width="15%"
          label="State"
          value={formData.state || ''}
          onChange={e => setFormData({ ...formData, state: e.target.value })}
          margin="normal"
        />
        <TextField
          width="15%"
          label="Zip Code"
          value={formData.zipcode || ''}
          onChange={e => setFormData({ ...formData, zipcode: e.target.value })}
          margin="normal"
        />
      </>
    ),
  },
  {
    label: 'Tell us about your project',
    description:
      'Please be as specific as possible about the project you have in mind. ',
      form: (formData, setFormData) => (
      <> 
        <TextField
          fullWidth
          label="Project Title"
          multiline
          rows={1}
          value={formData.title || ''}
          onChange={e => setFormData({ ...formData, title: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Tagline"
          multiline
          rows={2}
          value={formData.subtitle || ''}
          onChange={e => setFormData({ ...formData, subtitle: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Category"
          multiline
          rows={1}
          value={formData.category || ''}
          onChange={e => setFormData({ ...formData, category: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          multiline
          rows={2}
          value={formData.story || ''}
          onChange={e => setFormData({ ...formData, story: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Frequently Asked Questions"
          multiline
          rows={3}
          value={formData.faq || ''}
          onChange={e => setFormData({ ...formData, faq: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Funding Goal"
          multiline
          rows={1}
          value={formData.goal || ''}
          onChange={e => setFormData({ ...formData, goal: parseInt(e.target.value) })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Project Deadline"
          multiline
          rows={1}
          value={formData.expiration || ''}
          onChange={e => setFormData({ ...formData, expiration: e.target.value })}
          margin="normal"
        />
      </>  
      ),
  },
  {
    label: 'Rewards to the pledgers',
    description: `Tell us how you would like to reward pledgers. Neighbr.io provides a tiered rewards system where you can come up with between 1-3 tiers of rewards, each with different pledging amount.`,
    form: (formData, setFormData) => (
      <>
      <TextField
        fullWidth
        label="Tier 1 Reward Amount"
        multiline
        rows={1}
        value={formData.priceTier1 || ''}
        onChange={e => setFormData({ ...formData, priceTier1: parseInt(e.target.value) })}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Tier 1 Reward Description"
        multiline
        rows={2}
        value={formData.rewardTier1 || ''}
        onChange={e => setFormData({ ...formData, rewardTier1: e.target.value })}
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

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    console.log(formData);
    // REPLACE WITH API CALLS !!
  }

  return (
    <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
      <Paper square elevation={0} sx={{ display: 'flex', alignItems: 'center', height: 50, pl: 2, bgcolor: 'background.default', }}>
        <Typography>{steps[activeStep].label}</Typography>
      </Paper>
      <Box sx={{ height: 750, maxWidth: 400, width: '100%', p: 2 }}>
        {steps[activeStep].description}
        {steps[activeStep].form(formData, setFormData)}
      </Box>
      <MobileStepper variant="text" steps={maxSteps} position="static" activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={activeStep === maxSteps - 1 ? handleSubmit : handleNext}>
            {activeStep === maxSteps - 1 ? 'Submit' : 'Next'}
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            Back{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </Button>
        }
      />
    </Box>
  );
}