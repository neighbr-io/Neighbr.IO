import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { palette } from "@mui/system";
import { useGetProjectQuery } from "./projectSlice";
import { useParams } from "react-router-dom";

export default function InfoTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { id } = useParams();
  const { data: project, error, isLoading } = useGetProjectQuery(id);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !project) {
    return <div>Error occurred while retrieving data </div>;
  }
  const {
    title,
    subtitle,
    story,
    category,
    faq,
    updates,
    funded,
    expiration,
    goal,
    priceTier1,
    rewardTier1,
    priceTier2,
    rewardTier2,
    priceTier3,
    rewardTier3,
  } = project;

  return (
    <Box
      sx={{
        display: "flex",
        width: "800px",
        padding: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderColor: "divider" }}>
          <TabList
            orientation="vertical"
            variant="scrollable"
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Story" value="1" />
            <Tab label="FAQ" value="2" />
            <Tab label="Updates" value="3" />
            <Tab label="Rewards" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">{story}</TabPanel>
        <TabPanel value="2">{faq}</TabPanel>
        <TabPanel value="3">{updates}</TabPanel>
        <TabPanel value="4">
          Tier 1 Pledge: ${priceTier1}
          <br />
          Tier 1 Reward: {rewardTier1}
          {priceTier2 !== null && !isNaN(priceTier2) && (
            <>
              <br />
              Tier 2 Pledge: ${priceTier2}
            </>
          )}
          {rewardTier2 && (
            <>
              <br />
              Tier 2 Reward: {rewardTier2}
            </>
          )}
          {priceTier3 !== null && !isNaN(priceTier3) && (
            <>
              <br />
              Tier 3 Pledge: ${priceTier3}
            </>
          )}
          {rewardTier3 && (
            <>
              <br />
              Tier 3 Reward: {rewardTier3}
            </>
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
