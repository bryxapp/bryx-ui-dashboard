import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Typography, Tabs } from "antd";
import PastEstimates from "./PastEstimates/PastEstimates";
import EstimateDrafts from "./EstimateDrafts/EstimateDrafts";
import NewEstimateButton from "./NewEstimateButton";

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
    <>
      <Typography.Title level={2}>Estimates</Typography.Title>
      <NewEstimateButton maxEstimatesReached={maxEstimatesReached} />
      <Tabs
        activeKey={activeTab}
        onChange={handleTabChange}
        items={[
          {
            label: "Estimates",
            key: "1",
            children: <PastEstimates setMaxEstimatesReached={setMaxEstimatesReached} />
          },
          {
            label: "Drafts",
            key: "2",
            children: <EstimateDrafts />
          }
        ]}
    />
    </>
  );
};

export default Estimates;
