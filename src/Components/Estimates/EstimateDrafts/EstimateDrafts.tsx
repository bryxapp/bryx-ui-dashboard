import React, { useEffect, useState } from "react";
import EstimatesList from "./EstimateDraftsList/EstimateDraftsList";
import { getEstimateDrafts } from "../../../utils/estimate-drafts-api";
import Loading from "../../SharedComponents/Loading/Loading";
import NoneFound from "../../SharedComponents/NoneFound/NoneFound";
import { useAuth0 } from "@auth0/auth0-react";
import EstimatesPagingControls from "../PastEstimates/EstimatesPagingControls";

const PAGE_SIZE = 10; // Number of estimate drafts per page

const EstimateDrafts = () => {
  const [estimateDrafts, setEstimateDrafts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1); // Current page number
  const { user } = useAuth0();
  const userId = user?.email ? user.email : "";

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    getEstimateDrafts(userId, PAGE_SIZE, pageNumber) // Pass the pageNumber to getEstimateDrafts
      .then((response) => {
        setEstimateDrafts(response.data);
        setLoading(false);
      });
  }, [userId, pageNumber]); // Include pageNumber in the dependency array



  return (
    <React.Fragment>
      {loading && <Loading />}
      {!loading && estimateDrafts.length === 0 && <NoneFound item="drafts" />}
      {!loading && estimateDrafts.length > 0 && (
        <React.Fragment>
          <EstimatesList
            estimateDrafts={estimateDrafts}
            setEstimateDrafts={setEstimateDrafts}
          />
          <EstimatesPagingControls
            estimates={estimateDrafts}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            PAGE_SIZE={PAGE_SIZE}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default EstimateDrafts;
