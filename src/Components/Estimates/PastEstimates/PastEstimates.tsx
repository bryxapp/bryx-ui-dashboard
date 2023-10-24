import { useEffect, useRef, useState } from "react";
import { getEstimates } from "../../../utils/api/estimates-api";
import { EstimateData } from "../../../utils/types/EstimateInterfaces";
import PastEstimatesSearch from "./PastEstimatesSearch/PastEstimatesSearch";
import _ from "lodash"; // Import lodash
import { useAuth0User } from '../../../utils/customHooks/useAuth0User';
import PastEstimatesList from "./PastEstimatesList/PastEstimatesList";

const PAGE_SIZE = 10; // Number of estimate drafts per page

interface PastEstimatesProps {
  setMaxEstimatesReached: (maxEstimatesReached: boolean) => void;
}

const PastEstimates = ({ setMaxEstimatesReached }: PastEstimatesProps) => {
  const [estimates, setEstimates] = useState<EstimateData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [pageNumber, setPageNumber] = useState(1); // Current page number
  const [estimateRequestCompleted, setEstimateRequestCompleted] = useState(false);
  const [errorRetrievingEstimates, setErrorRetrievingEstimates] = useState(false);

  const { auth0User, getAccessToken } = useAuth0User();

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
        try {
          const estimateData = await getEstimates(pageSize, pageNumber, token, searchTerm, selectedTemplateId)
          setEstimates(estimateData.estimates);
          setMaxEstimatesReached(estimateData.maxEstimatesReached);
        }
        catch (error) {
          console.error('Error retrieving estimates:', error);
          setErrorRetrievingEstimates(true);
        }
        finally {
          setEstimateRequestCompleted(true);
        }
      },
      500
    )
  );

  useEffect(() => {
    const fetchEstimates = async () => {
      setEstimateRequestCompleted(false);
      const token = await getAccessToken();
      if (!token) return;
      loadEstimates.current(
        PAGE_SIZE,
        pageNumber,
        token,
        searchTerm,
        selectedTemplateId
      );
    }
    fetchEstimates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, searchTerm, selectedTemplateId, auth0User?.sub]);

  return (
    <>
      <PastEstimatesSearch
        disabled={estimateRequestCompleted && estimates.length === 0 && searchTerm.length === 0 && selectedTemplateId.length === 0}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedTemplateId={selectedTemplateId}
        setSelectedTemplateId={setSelectedTemplateId}
      />
      <br />
      <PastEstimatesList
        estimates={estimates}
        setEstimates={setEstimates}
        estimateRequestCompleted={estimateRequestCompleted}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        PAGE_SIZE={PAGE_SIZE}
        errorRetrievingEstimates={errorRetrievingEstimates} />
    </>
  );
};

export default PastEstimates;
