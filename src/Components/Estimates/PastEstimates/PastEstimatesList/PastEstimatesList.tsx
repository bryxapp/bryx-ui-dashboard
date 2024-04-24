import { Divider, List, message } from "antd";
import { useAuth0User } from '../../../../utils/customHooks/useAuth0User';
import { deleteEstimate } from "../../../../utils/api/estimates-api";
import { EstimateData } from "../../../../utils/types/EstimateInterfaces";
import logger from "../../../../logging/logger";
import NoneFound from "../../../SharedComponents/NoneFound/NoneFound";
import EstimateListItem from "../../SharedEstimateComponents/EstimateListItem";
import Loading from "../../../SharedComponents/Loading/Loading";
import EstimatesPagingControls from "../../SharedEstimateComponents/EstimatesPagingControls";


interface PastEstimatesListProps {
    estimates: EstimateData[];
    setEstimates: (estimates: EstimateData[]) => void;
    estimateRequestCompleted: boolean;
    pageSize: number;
    pageNumber: number;
    setPageNumber: (pageNumber: number) => void;
}

const PastEstimatesList = ({ estimates, setEstimates, estimateRequestCompleted, pageSize, pageNumber, setPageNumber }: PastEstimatesListProps) => {
    // State and hooks
    const { getAccessToken } = useAuth0User();

    // Helper function to handle estimate deletion
    const handleEstimateDelete = async (estimateId: string) => {
        try {
            const token = await getAccessToken();
            if (!token) return;
            await deleteEstimate(estimateId, token)
            setEstimates(estimates.filter((estimate: any) => estimate.id !== estimateId));
        }
        catch (deleteEx) {
            logger.trackException({
                properties: {
                    name: 'Estimate Delete Error',
                    page: 'Past Estimates',
                    description: 'Error deleting estimate',
                    error: deleteEx,
                },
            });
            message.error('Error deleting estimate.');
        }
    };

    if (estimates.length === 0 && !estimateRequestCompleted) {
        return <Loading />
    }

    if (estimates.length === 0 && estimateRequestCompleted) {
        return <NoneFound item="estimates" />
    }

    return (
        <>
            <Divider style={{ marginBottom: 0 }} />
            <List
                size="large"
                dataSource={estimates}
                renderItem={(estimate: EstimateData) => (
                    <EstimateListItem
                        key={estimate.id}
                        estimate={estimate}
                        handleEstimateDelete={handleEstimateDelete}
                        editLink={"/view-estimate?estimateId=" + estimate.id}
                        itemName="Estimate"
                        type="estimate"
                    />

                )}
            />
            <EstimatesPagingControls
                estimates={estimates}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                PAGE_SIZE={pageSize}
            />
        </>
    );
};

export default PastEstimatesList;