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
  const { auth0User, getAccessToken } = useAuth0User();

  useEffect(() => {
    const fetchEstimateDrafts = async () => {
      setLoading(true);
      const token = await getAccessToken();
      if (!token) return;
      const estimateDrafts = await getEstimateDrafts(PAGE_SIZE, pageNumber, token);
      setEstimateDrafts(estimateDrafts);
      setLoading(false);
    }
    fetchEstimateDrafts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber,auth0User?.sub]);


  const handleEstimateDraftDelete = async (estimateDraftId: string) => {
    const token = await getAccessToken();
    if (!token) return;
    await deleteEstimateDraft(estimateDraftId, token)
    setEstimateDrafts(estimateDrafts.filter((estimateDraft: any) => estimateDraft.id !== estimateDraftId));
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
