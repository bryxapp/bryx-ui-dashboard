import { useEffect, useState } from "react";
import { deleteEstimateDraft, getEstimateDrafts } from "../../../utils/api/estimate-drafts-api";
import Loading from "../../SharedComponents/Loading/Loading";
import NoneFound from "../../SharedComponents/NoneFound/NoneFound";
import EstimatesPagingControls from "../SharedEstimateComponents/EstimatesPagingControls";
import { EstimateDraftData } from "../../../utils/types/EstimateInterfaces";
import { List } from "antd";
import EstimateListItem from "../SharedEstimateComponents/EstimateListItem";
import { useAuth0User } from "../../../utils/customHooks/useAuth0User";
import logger from "../../../logging/logger";
import ErrorMessage from "../../SharedComponents/ErrorMessage/ErrorMessage";
import ErrorModal from "../../SharedComponents/ErrorModal/ErrorModal";

const PAGE_SIZE = 10; // Number of estimate drafts per page

const EstimateDrafts = () => {
  const [estimateDrafts, setEstimateDrafts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1); // Current page number
  const { auth0User, getAccessToken } = useAuth0User();
  const [error, setError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  useEffect(() => {
    const fetchEstimateDrafts = async () => {
      try {
        setLoading(true);
        const token = await getAccessToken();
        if (!token) return;
        const estimateDrafts = await getEstimateDrafts(PAGE_SIZE, pageNumber, token);
        setEstimateDrafts(estimateDrafts);
      }
      catch (error) {
        logger.trackException({
          properties: {
            name: "Estimate Drafts Error",
            page: "Estimate Drafts",
            description: "Error fetching estimate drafts",
            error: error,
          },
        });
        setError(true);
      }
      finally {
        setLoading(false);
      }
    }
    fetchEstimateDrafts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, auth0User?.sub]);


  const handleEstimateDraftDelete = async (estimateDraftId: string) => {
    try {
      setDeleteError(false);
      const token = await getAccessToken();
      if (!token) return;
      await deleteEstimateDraft(estimateDraftId, token)
      setEstimateDrafts(estimateDrafts.filter((estimateDraft: any) => estimateDraft.id !== estimateDraftId));
    }
    catch (error) {
      logger.trackException({
        properties: {
          name: "Estimate Draft Delete Error",
          page: "Estimate Drafts",
          description: "Error deleting estimate draft",
          error: error,
        },
      });
      setDeleteError(true);
    }
  };

  if (loading) return <Loading />;

  if (estimateDrafts.length === 0) return <NoneFound item="drafts" />;

  if (error) return <ErrorMessage dataName="Estimate Drafts" />;

  return (
    <>
      <ErrorModal error={deleteError} setError={setDeleteError} content="Error deleting draft" />
      <List
        size="large"
        dataSource={estimateDrafts}
        renderItem={(estimateDraft: EstimateDraftData) => (
          <EstimateListItem
            key={estimateDraft.id}
            estimate={estimateDraft}
            handleEstimateDelete={handleEstimateDraftDelete}
            editLink={'/form?templateId=' + estimateDraft.templateId + '&draftId=' + estimateDraft.id}
            itemName='Estimate Draft'
            type="draft" />
        )}
      />
      <EstimatesPagingControls
        estimates={estimateDrafts}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        PAGE_SIZE={PAGE_SIZE}
      />
    </>
  );
};

export default EstimateDrafts;
