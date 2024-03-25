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
              <Tab label="Who are we?" {...a11yProps(0)} />
              <Tab label="What do we do?" {...a11yProps(1)} />
              <Tab label="How can I get invovled?" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
           We are a small company founded out of Fullstack.
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Neihbor.io leverages community spirit to support local businesses.
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            You can join as a customer or small business owner.
          </CustomTabPanel>
        </>
    );
};

export default Questions;