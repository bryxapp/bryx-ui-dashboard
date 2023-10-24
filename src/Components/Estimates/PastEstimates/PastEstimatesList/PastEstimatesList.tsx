import NoneFound from "../../../SharedComponents/NoneFound/NoneFound";
import { List } from "@mui/material";
import EstimateListItem from "../../SharedEstimateComponents/EstimateListItem";
import Loading from "../../../SharedComponents/Loading/Loading";
import { useAuth0User } from '../../../../utils/customHooks/useAuth0User';
import { Alert } from "@mui/material";
import { EstimateData } from "../../../../utils/types/EstimateInterfaces";
import { deleteEstimate } from "../../../../utils/api/estimates-api";
import EstimatesPagingControls from "../../SharedEstimateComponents/EstimatesPagingControls";

interface PastEstimatesListProps {
    estimates: EstimateData[];
    setEstimates: (estimates: EstimateData[]) => void;
    estimateRequestCompleted: boolean;
    pageNumber: number;
    setPageNumber: (pageNumber: number) => void;
    PAGE_SIZE: number;
    errorRetrievingEstimates: boolean;
}

const PastEstimatesList = ({ estimates, setEstimates, estimateRequestCompleted, pageNumber, setPageNumber, PAGE_SIZE, errorRetrievingEstimates }: PastEstimatesListProps) => {
    const { getAccessToken } = useAuth0User();

    const handleEstimateDelete = async (estimateId: string) => {
        const token = await getAccessToken();
        if (!token) return;
        await deleteEstimate(estimateId, token)
        setEstimates(estimates.filter((estimate: any) => estimate.id !== estimateId));
    };

    if (errorRetrievingEstimates) {
        return <Alert severity="error">There was an error retrieving your estimates. Please try again.</Alert>
    }
    if (estimates.length === 0 && !estimateRequestCompleted && !errorRetrievingEstimates) {
        return <Loading />
    }
    if (estimates.length === 0 && estimateRequestCompleted && !errorRetrievingEstimates) { return <NoneFound item="estimates" /> }

    return (
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
    );
};

export default PastEstimatesList;
