import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Typography, Tabs, Button } from "antd";
import PastEstimates from "./PastEstimates/PastEstimates";
import EstimateDrafts from "./EstimateDrafts/EstimateDrafts";

const { TabPane } = Tabs;

const Estimates: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("1");
  const [maxEstimatesReached, setMaxEstimatesReached] = useState(false);
  const location = useLocation();

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tabValue = searchParams.get("tab") || "1";
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
      <Typography.Title level={4}>Estimates</Typography.Title>
      <Button type="primary" disabled={maxEstimatesReached}>
        New Estimate
      </Button>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Estimates" key="1">
          <PastEstimates setMaxEstimatesReached={setMaxEstimatesReached} />
        </TabPane>
        <TabPane tab="Drafts" key="2">
          <EstimateDrafts />
        </TabPane>
      </Tabs>
    </React.Fragment>
  );
};

export default Estimates;
