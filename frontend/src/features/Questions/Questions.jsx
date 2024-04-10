import React, { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { AlignHorizontalCenter } from "@mui/icons-material";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const CustomTabPanel = ({ children, value, index }) => {
  if (value === index) {
    return <div>{children}</div>;
  }
  return null;
};

const Questions = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
          <h3>Frequently Asked Questions</h3>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Neighbrs" {...a11yProps(0)} />
              <Tab label="Business / Projects" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
          <ul>
          <p className="faq">What is a neighbr?</p>
          <li>
          Neighbrs are community members who use this site to pledge financial support to local businesses and their projects. We encourage our neighbrs to shop and support small and local businesses!
          </li>
          <p className="faq">How much money can I pledge to a project?</p>
          <li>Each project will have 1 to 3 different tier amounts that you can pledge to - the amounts will vary based on what the business has established. You can pledge to more than one tier for a project and you also can pledge to multiple projects.</li> 
          <p className="faq">What are tier rewards?</p>
          <li>Tier rewards are products and/or services that the business will reward their supporters as a thank you!</li>
          <p className="faq">When will my credit card be charged?</p> 
          <li>Your credit card will be charged once you enter your information and click the Pay button. However, if the project does not get fully funded, your transaction will be refunded.</li>
          <p className="faq">Will I receive a record of my pledge?</p> 
          <li>Yes! You will receive an email receipt. You can also view transaction history in your account dashboard once you’re signed in.</li> 
          </ul>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
          <ul>
            <p className="faq">What are the requirements to sign up my business?</p>
            <li>Businesses should be considered a “small business” under the US Small Business Administration size standard: <a href="https://www.sba.gov/federal-contracting/contracting-guide/size-standards">SBA Size Standards</a></li>
            <li>Must be physically located and operate in the United States</li>
            <li>Must be independently owned and operated
            </li>
            <p className="faq">Can I be a franchise owner?</p>
            <li>No, we are currently not accepting registrations from franchise businesses.
            </li>
            <p className="faq">Is there a funding amount limit for my project?
            </p>
            <li>Yes, you can set your funding target for any amount up to $10,000</li>
            <p className="faq">Can I create more than one project for my business? 
            </p>
            <li>No, there is currently a limit of one project per business so that we can promote as many small and local businesses as possible. 
            </li>
            <p className="faq">What are the requirements to sign up a new project?
            </p>
            <li>You can view the New Project Form required fields here: <a href="/newprojectform">New Project Form</a></li>
            <li>Once you submit your business and project information, we will contact you to verify that you meet the business requirements.</li>
            <li>Pro tip: Be specific about what you’re raising funds for. Your project should be a product or service that directly supports the business’ operations, sales, research & development, or marketing.
            </li>
            <p className="faq">Am I required to provide tier rewards for my project? </p>
            <li>You are required to set at least one tier reward for your project, and a maximum of three. Tier rewards are a great way for businesses to engage with their supporters and build their neighbr community!
            </li>
          </ul>
          </CustomTabPanel>
        </>
    );
};

export default Questions;