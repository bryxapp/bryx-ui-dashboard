import { useEffect, useRef, useState } from "react";
import { getEstimates } from "../../../utils/api/estimates-api";
import { getTemplates } from "../../../utils/api/templates-api";
import NoneFound from "../../SharedComponents/NoneFound/NoneFound";
import { EstimateData } from "../../../utils/types/EstimateInterfaces";
import { TemplateData } from "../../../utils/types/TemplateInterfaces";
import EstimatesPagingControls from "../SharedEstimateComponents/EstimatesPagingControls";
import EstimatesSearch from "../SharedEstimateComponents/EstimatesSearch";
import { deleteEstimate } from "../../../utils/api/estimates-api";
import { List } from "@mui/material";
import EstimateListItem from "../SharedEstimateComponents/EstimateListItem";
import _ from "lodash"; // Import lodash
import Loading from "../../SharedComponents/Loading/Loading";
import { useAccessToken } from '../../../utils/customHooks/useAccessToken';


const PAGE_SIZE = 2; // Number of estimate drafts per page

const PastEstimates = () => {
  const [estimates, setEstimates] = useState<EstimateData[]>([]);
  const [templates, setTemplates] = useState<TemplateData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [pageNumber, setPageNumber] = useState(1); // Current page number
  const [estimateRequestCompleted, setEstimateRequestCompleted] = useState(false);
  const { getAccessToken } = useAccessToken();

  const loadEstimates = useRef(
    _.debounce(
      async (
        pageSize: number,
        pageNumber: number,
        token: string,
        searchTerm: string,
        selectedTemplateId: string
      ) => {
        getEstimates(
          pageSize,
          pageNumber,
          token,
          searchTerm,
          selectedTemplateId
        ).then((response) => {
          setEstimates(response.data);
          setEstimateRequestCompleted(true);
        });
      },
      500
    )
  );

  useEffect(() => {
    setEstimateRequestCompleted(false);
    getAccessToken().then((token) => {
      if (!token) return;
      getTemplates(token).then((response) => {
        setTemplates(response.data);
      });
    });
  }, [getAccessToken]);

  useEffect(() => {
    getAccessToken().then((token) => {
      if (!token) return;
      loadEstimates.current(
        PAGE_SIZE,
        pageNumber,
        token,
        searchTerm,
        selectedTemplateId
      );
    });
  }, [pageNumber, searchTerm, selectedTemplateId, getAccessToken]);

  const handleEstimateDelete = (estimateId: string) => {
    getAccessToken().then((token) => {
      if (!token) return;
      deleteEstimate(estimateId, token).then(() => {
        setEstimates((prevEstimates) =>
          prevEstimates.filter((estimate) => estimate.id !== estimateId)
        );
      });
    });
  };

  return (
    <>
      <EstimatesSearch
        templates={templates}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTemplateId={selectedTemplateId}
        setSelectedTemplateId={setSelectedTemplateId}
      />
      <br />
      <>
        {estimates.length === 0 && !estimateRequestCompleted && (
          <Loading />
        )}
        {estimates.length === 0 && estimateRequestCompleted ? (<NoneFound item="estimates" />
        ) : (
          <>
            <List>
              {estimates.map((estimate) => (
                <EstimateListItem
                  key={estimate.id}
                  estimate={estimate}
                  handleEstimateDelete={handleEstimateDelete}
                  editLink={"/view-estimate?estimateId=" + estimate.id}
                  itemName="Estimate"
                  type="estimate"
                />
              ))}
            </List>
            <EstimatesPagingControls
              estimates={estimates}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
              PAGE_SIZE={PAGE_SIZE}
            />
          </>
        )}
      </>
    </>
  );
};

export default PastEstimates;
