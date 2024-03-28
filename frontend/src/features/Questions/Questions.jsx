import React, { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Neighbr" {...a11yProps(0)} />
              <Tab label="Business" {...a11yProps(1)} />
              <Tab label="Rewards and Refunds" {...a11yProps(2)} />
              <Tab label="Contact Us" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
          <br />Question: When will I receive my reward? Does the goal need to be reached?<br /><br />
            Answer: You will recieve an email notification from the vendor with the reward instrutions after your pledge. In some case your reward will be recieved if the goal is only meet.
          <br />Question: Do post the payment at once, what happens if the goal is not meeet?<br /><br />
            Answer: You will be charged at the time you decide to pledge, but if the goal is not meet youll be able to use those funds for another other project.
          <br />Question: Can I donate to the business directly with out chosing to get a reward?<br /><br />
            Answer: Yes there is a button to donate directly with out reward or bounded by a goal. It will help others reach the goal faster.
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
          <br />Question: How long does it take to be verfied from time I enter the from?<br /><br />
            Answer: It various between 2 weeks and 4 weeks. There will be a letter mailed to you with a verfication code which will be inserted on the website.
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
          <br />Question: Will I get a refund if the goal is not meet?<br /><br />
            Answer: At this moment you will not get a refund, because it lowers cost to our business, however youll get a credit to pledge to a different project.
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
          <br />123-456-7890<br /><br />
          CustomerService@Neighbr.com
          </CustomTabPanel>
        </>
    );
};

export default Questions;