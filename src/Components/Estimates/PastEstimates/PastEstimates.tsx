import { useEffect, useRef, useState } from "react";
import { getEstimates } from "../../../utils/estimates-api";
import { getTemplates } from "../../../utils/templates-api";
import NoneFound from "../../SharedComponents/NoneFound/NoneFound";
import { EstimateData } from "../../../utils/types/EstimateInterfaces";
import { TemplateData } from "../../../utils/types/TemplateInterfaces";
import EstimatesPagingControls from "../SharedEstimateComponents/EstimatesPagingControls";
import EstimatesSearch from "../SharedEstimateComponents/EstimatesSearch";
import { deleteEstimate } from "../../../utils/estimates-api";
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
  const { userId, getAccessToken } = useAccessToken();

  const loadEstimates = useRef(
    _.debounce(
      (
        userId: string,
        pageSize: number,
        pageNumber: number,
        searchTerm: string,
        selectedTemplateId: string
      ) => {
        getAccessToken().then((token) => {
          if (!token) return;
          getEstimates(
            userId,
            pageSize,
            pageNumber,
            searchTerm,
            selectedTemplateId
          ).then((response) => {
            setEstimates(response.data);
            setEstimateRequestCompleted(true);
          });
        });
      },
      500
    )
  );

  useEffect(() => {
    setEstimateRequestCompleted(false);
    if (!userId) return;
    getAccessToken().then((token) => {
      if (!token) return;
      getTemplates(userId,token).then((response) => {
        setTemplates(response.data);
      });
    });
  }, [userId, getAccessToken]);

  useEffect(() => {
    if (!userId) return;

    loadEstimates.current(
      userId,
      PAGE_SIZE,
      pageNumber,
      searchTerm,
      selectedTemplateId
    );
  }, [userId, pageNumber, searchTerm, selectedTemplateId]);

  const handleEstimateDelete = (estimateId: string) => {
    deleteEstimate(estimateId).then(() => {
      setEstimates((prevEstimates) =>
        prevEstimates.filter((estimate) => estimate.id !== estimateId)
      );
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
