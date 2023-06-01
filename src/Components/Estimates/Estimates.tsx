import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PastEstimates from "./PastEstimates/PastEstimates";
import EstimateDrafts from "./EstimateDrafts/EstimateDrafts";
import useTheme from "@mui/material/styles/useTheme";

const Estimates: React.FC = () => {
  const theme = useTheme();
  const textColor = theme.palette.mode === "dark" ? "white" : "black";
  const [activeTab, setActiveTab] = useState<number>(0);
  const location = useLocation();

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tabValue = parseInt(searchParams.get("tab") || "0", 10);
    setActiveTab(tabValue);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("tab", activeTab.toString());
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [activeTab, location.pathname]);

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
