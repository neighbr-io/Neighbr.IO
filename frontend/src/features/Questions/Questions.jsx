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
          Coming soon!
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
          Coming soon!
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
          Coming soon!
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
          123-456-7890
          </CustomTabPanel>
        </>
    );
};

export default Questions;