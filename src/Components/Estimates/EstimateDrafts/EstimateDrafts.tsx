import React, { useEffect, useState } from "react";
import { deleteEstimateDraft, getEstimateDrafts } from "../../../utils/estimate-drafts-api";
import Loading from "../../SharedComponents/Loading/Loading";
import NoneFound from "../../SharedComponents/NoneFound/NoneFound";
import { useAuth0 } from "@auth0/auth0-react";
import EstimatesPagingControls from "../SharedEstimateComponents/EstimatesPagingControls";
import { EstimateDraftData } from "../../../utils/types/EstimateInterfaces";
import { List } from "@mui/material";
import EstimateListItem from "../SharedEstimateComponents/EstimateListItem";

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


  const handleEstimateDraftDelete = (estimateDraftId: string) => {
    deleteEstimateDraft(estimateDraftId).then(() => {
      setEstimateDrafts(estimateDrafts.filter((estimateDraft: any) => estimateDraft.id !== estimateDraftId));
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
                itemName='Estimate Draft' />
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
