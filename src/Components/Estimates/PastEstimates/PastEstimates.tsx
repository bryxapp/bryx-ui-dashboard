import React, { useState } from 'react';
import PastEstimatesSearch from './PastEstimatesSearch/PastEstimatesSearch';
import PastEstimatesList from './PastEstimatesList/PastEstimatesList';
import { EstimateData } from '../../../utils/types/EstimateInterfaces';
interface PastEstimatesProps {
  setMaxEstimatesReached: (maxEstimatesReached: boolean) => void;
}

const PAGE_SIZE = 10; // Number of estimate drafts per page

const PastEstimates: React.FC<PastEstimatesProps> = ({ setMaxEstimatesReached }) => {
  const [estimates, setEstimates] = useState<EstimateData[]>([]);
  const [estimateRequestCompleted, setEstimateRequestCompleted] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);

  return (
    <>
      <PastEstimatesSearch
        pageNumber={pageNumber}
        pageSize={PAGE_SIZE}
        setEstimates={setEstimates}
        setMaxEstimatesReached={setMaxEstimatesReached}
        setEstimateRequestCompleted={setEstimateRequestCompleted}
      />
      <PastEstimatesList
        estimates={estimates}
        setEstimates={setEstimates}
        estimateRequestCompleted={estimateRequestCompleted}
        pageSize={PAGE_SIZE}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </>
  );
};

export default PastEstimates;