import React, { useEffect, useState } from "react";
import { deleteEstimateDraft, getEstimateDrafts } from "../../../utils/api/estimate-drafts-api";
import Loading from "../../SharedComponents/Loading/Loading";
import NoneFound from "../../SharedComponents/NoneFound/NoneFound";
import EstimatesPagingControls from "../SharedEstimateComponents/EstimatesPagingControls";
import { EstimateDraftData } from "../../../utils/types/EstimateInterfaces";
import { List } from "@mui/material";
import EstimateListItem from "../SharedEstimateComponents/EstimateListItem";
import { useAuth0User } from "../../../utils/customHooks/useAuth0User";

const PAGE_SIZE = 10; // Number of estimate drafts per page

const EstimateDrafts = () => {
  const [estimateDrafts, setEstimateDrafts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1); // Current page number
  const { getAccessToken } = useAuth0User();

  useEffect(() => {
    setLoading(true);
    getAccessToken().then((token) => {
      if (!token) return;
      getEstimateDrafts(PAGE_SIZE, pageNumber, token) // Pass the pageNumber to getEstimateDrafts
        .then((response) => {
          setEstimateDrafts(response.data.fetchedEstimateDrafts);
          setLoading(false);
        });
    });
  }, [pageNumber, getAccessToken]); // Include pageNumber in the dependency array


  const handleEstimateDraftDelete = (estimateDraftId: string) => {
    getAccessToken().then((token) => {
      if (!token) return;
      deleteEstimateDraft(estimateDraftId, token).then(() => {
        setEstimateDrafts(estimateDrafts.filter((estimateDraft: any) => estimateDraft.id !== estimateDraftId));
      });
    });
  };

  return (
    <React.Fragment>
      {loading && <Loading />}
      {!loading && estimateDrafts.length === 0 && <NoneFound item="drafts" />}
      {!loading && estimateDrafts.length > 0 && (
        <React.Fragment>
          <List>
            {estimateDrafts.map((estimateDraft: EstimateDraftData) => (
              <EstimateListItem
                key={estimateDraft.id}
                estimate={estimateDraft}
                handleEstimateDelete={handleEstimateDraftDelete}
                editLink={'/form?templateId=' + estimateDraft.templateId + '&draftId=' + estimateDraft.id}
                itemName='Estimate Draft'
                type="draft" />
            ))}
          </List>
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
