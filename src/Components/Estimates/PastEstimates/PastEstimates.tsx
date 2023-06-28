
import { useEffect, useState } from "react";
import EstimatesList from "./EstimatesList/EstimatesList";
import { getEstimates } from "../../../utils/estimates-api";
import { getTemplates } from "../../../utils/templates-api";
import Loading from "../../SharedComponents/Loading/Loading";
import NoneFound from "../../SharedComponents/NoneFound/NoneFound";
import { useAuth0 } from "@auth0/auth0-react";
import { EstimateData } from "../../../utils/types/EstimateInterfaces";
import { TemplateData } from "../../../utils/types/TemplateInterfaces";
import EstimatesPagingControls from "./EstimatesPagingControls";
import EstimatesSearch from "./EstimatesSearch";

const PAGE_SIZE = 10; // Number of estimate drafts per page

const PastEstimates = () => {

  const [estimates, setEstimates] = useState<EstimateData[]>([]);
  const [templates, setTemplates] = useState<TemplateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [pageNumber, setPageNumber] = useState(1); // Current page number
  const { user } = useAuth0();
  const userId = user?.email ? user.email : "";

  useEffect(() => {
    if (!userId) return;
    getEstimates(userId, PAGE_SIZE, pageNumber).then((response) => {
      setEstimates(response.data);
      setLoading(false);
    });
    getTemplates(userId).then((response) => {
      setTemplates(response.data);
    }
    );
  }, [userId, pageNumber]);

  const filteredEstimates = estimates
    .filter((estimate) => {
      return estimate.estimateName.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .filter((estimate) => {
      return selectedTemplateId === "" || estimate.templateId === selectedTemplateId;
    });

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <>
          <EstimatesSearch
            estimates={estimates}
            templates={templates}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedTemplateId={selectedTemplateId}
            setSelectedTemplateId={setSelectedTemplateId}
          />
          <br />
          {filteredEstimates.length === 0 && <NoneFound item="estimates" />}
          {filteredEstimates.length > 0 && (
            <>
              <EstimatesList estimates={filteredEstimates} setEstimates={setEstimates} />
              <EstimatesPagingControls
                estimates={filteredEstimates}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                PAGE_SIZE={PAGE_SIZE}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default PastEstimates;