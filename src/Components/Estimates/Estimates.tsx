import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PastEstimates from "./PastEstimates/PastEstimates";
import EstimateDrafts from "./EstimateDrafts/EstimateDrafts";
import useTheme from "@mui/material/styles/useTheme";

const Estimates = () => {
  const theme = useTheme();
  const textColor = theme.palette.mode === "dark" ? "white" : "black";
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event:any, newValue:any) => {
    setActiveTab(newValue);
  };

  return (
    <React.Fragment>
      <Typography variant="h3" color={textColor}>
        Estimates
      </Typography>
      <Box sx={{ width: "100%", marginTop: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="Estimates" />
          <Tab label="Drafts" />
        </Tabs>
        <Box
          role="tabpanel"
          hidden={activeTab !== 0}
          id="past-estimates-tabpanel"
          sx={{ marginTop: 2 }}
        >
          {activeTab === 0 && <PastEstimates />}
        </Box>
        <Box
          role="tabpanel"
          hidden={activeTab !== 1}
          id="draft-estimates-tabpanel"
          sx={{ marginTop: 2 }}
        >
          {activeTab === 1 && <EstimateDrafts />}
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Estimates;
