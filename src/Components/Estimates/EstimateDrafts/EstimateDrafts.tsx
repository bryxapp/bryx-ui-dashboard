import React, { useEffect, useState } from "react";
import EstimatesList from "./EstimateDraftsList/EstimateDraftsList";
import { getEstimateDrafts } from "../../../utils/estimate-drafts-api";
import Loading from "../../SharedComponents/Loading/Loading";
import NoneFound from "../../SharedComponents/NoneFound/NoneFound";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

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

  const handlePageChange = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };

  const hasPreviousPage = pageNumber > 1;
  const hasNextPage = estimateDrafts.length >= PAGE_SIZE;

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
          <div>
            <Tooltip title={hasPreviousPage ? "Go to previous page" : "No previous pages"}>
              <span>
                <Button
                  disabled={!hasPreviousPage}
                  onClick={() => handlePageChange(pageNumber - 1)}
                >
                  {"<"}
                </Button>
              </span>
            </Tooltip>
            <span>{pageNumber}</span>
            <Tooltip title={hasNextPage ? "Go to next page" : "No more pages"}>
              <span>
                <Button
                  disabled={!hasNextPage}
                  onClick={() => handlePageChange(pageNumber + 1)}
                >
                  {">"}
                </Button>
              </span>
            </Tooltip>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default EstimateDrafts;
