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
          fullWidth
          label="Business Address"
          value={formData.businessAddress || ''}
          onChange={e => setFormData({ ...formData, businessAddress: e.target.value })}
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
        <TextField
          fullWidth
          label="Project Description"
          multiline
          rows={4}
          value={formData.projectDescription || ''}
          onChange={e => setFormData({ ...formData, projectDescription: e.target.value })}
          margin="normal"
        />
      ),
  },
  {
    label: 'Rewards to the pledgers',
    description: `Tell us how you would like to reward pledgers. Neighbr.io provides a tiered rewards system where you can come up with between 1-3 tiers of rewards, each with different pledging amount.`,
    form: (formData, setFormData) => (
      <TextField
        fullWidth
        label="Rewards Description"
        multiline
        rows={4}
        value={formData.rewardsDescription || ''}
        onChange={e => setFormData({ ...formData, rewardsDescription: e.target.value })}
        margin="normal"
      />
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
      <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2 }}>
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