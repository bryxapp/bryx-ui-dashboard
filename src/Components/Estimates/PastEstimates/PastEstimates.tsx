import { useEffect, useRef, useState } from "react";
import { getEstimates, deleteEstimate } from "../../../utils/api/estimates-api";
import NoneFound from "../../SharedComponents/NoneFound/NoneFound";
import { EstimateData } from "../../../utils/types/EstimateInterfaces";
import EstimatesPagingControls from "../SharedEstimateComponents/EstimatesPagingControls";
import EstimatesSearch from "../SharedEstimateComponents/EstimatesSearch";
import { List } from "@mui/material";
import EstimateListItem from "../SharedEstimateComponents/EstimateListItem";
import _ from "lodash"; // Import lodash
import Loading from "../../SharedComponents/Loading/Loading";
import { useAccessToken } from '../../../utils/customHooks/useAccessToken';
import { Alert } from "@mui/material";


const PAGE_SIZE = 2; // Number of estimate drafts per page

const PastEstimates = () => {
  const [estimates, setEstimates] = useState<EstimateData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [pageNumber, setPageNumber] = useState(1); // Current page number
  const [estimateRequestCompleted, setEstimateRequestCompleted] = useState(false);
  const [errorRetrievingEstimates, setErrorRetrievingEstimates] = useState(false);

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
        setErrorRetrievingEstimates(false);
        getEstimates(
          pageSize,
          pageNumber,
          token,
          searchTerm,
          selectedTemplateId
        )
          .then((response) => {
            setEstimates(response.data);
          })
          .catch(error => {
            console.error('Error retrieving estimates:', error);
            setErrorRetrievingEstimates(true);
          })
          .finally(() => {
            setEstimateRequestCompleted(true);
          });
      },
      500
    )
  );

  useEffect(() => {
    setEstimateRequestCompleted(false);
    getAccessToken().then((token: any) => {
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
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTemplateId={selectedTemplateId}
        setSelectedTemplateId={setSelectedTemplateId}
      />
      <br />
      <>
        {errorRetrievingEstimates && (
          <Alert severity="error">There was an error retrieving your estimates. Please try again.</Alert>
        )}
        {estimates.length === 0 && !estimateRequestCompleted && !errorRetrievingEstimates && (
          <Loading />
        )}
        {estimates.length === 0 && estimateRequestCompleted && !errorRetrievingEstimates && <NoneFound item="estimates" />}
        {estimates.length > 0 && (
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
