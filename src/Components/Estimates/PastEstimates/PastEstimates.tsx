import { useState } from "react";
import PastEstimatesSearch from "./PastEstimatesSearch/PastEstimatesSearch";
import PastEstimatesList from "./PastEstimatesList/PastEstimatesList";

interface PastEstimatesProps {
  setMaxEstimatesReached: (maxEstimatesReached: boolean) => void;
}

const PastEstimates = ({ setMaxEstimatesReached }: PastEstimatesProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [noEstimatesAvailable, setNoEstimatesAvailable] = useState(false);

  return (
    <>
      <PastEstimatesSearch
        disabled={noEstimatesAvailable && searchTerm.length === 0 && selectedTemplateId.length === 0}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTemplateId={selectedTemplateId}
        setSelectedTemplateId={setSelectedTemplateId}
      />
      <PastEstimatesList
        searchTerm={searchTerm}
        selectedTemplateId={selectedTemplateId}
        setNoEstimatesAvailable={setNoEstimatesAvailable}
        setMaxEstimatesReached={setMaxEstimatesReached}
      />
    </>
  );
};

export default PastEstimates;
