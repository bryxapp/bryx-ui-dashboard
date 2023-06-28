import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PastEstimates from "./PastEstimates/PastEstimates";
import EstimateDrafts from "./EstimateDrafts/EstimateDrafts";
import useTheme from "@mui/material/styles/useTheme";
import { useAuth0 } from "@auth0/auth0-react";
import logger from "../../logging/logger";

const Estimates: React.FC = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<number>(0);
  const location = useLocation();
  const { user } = useAuth0();

  const handleNewEstimateClick = () => {
    logger.trackEvent({
      name: 'New Estimate Click',
      properties: { menu: 'New Estimate', user: user?.name, environment: process.env.NODE_ENV },
    });
  };

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
      <Typography variant="h3" color={theme.palette.text.primary}>
        Estimates
      </Typography>
      <br />
      <Button
        href='/select-template'
        onClick={handleNewEstimateClick}
        variant='contained'
        color='primary'
        size='large'
        sx={{ borderRadius: 2 }}
      >
        + New Estimate
      </Button>
      <Box sx={{ width: "100%", marginTop: 2 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab
            label="Estimates"
            sx={{
              color: activeTab === 0 ? theme.palette.primary.main : theme.palette.text.primary
            }}
          />
          <Tab
            label="Drafts"
            sx={{
              color: activeTab === 1 ? theme.palette.primary.main : theme.palette.text.primary
            }}
          />
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
