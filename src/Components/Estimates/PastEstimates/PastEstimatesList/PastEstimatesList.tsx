import { useEffect, useRef, useState } from "react";
import { List } from "@mui/material";
import _ from "lodash";

import { useAuth0User } from '../../../../utils/customHooks/useAuth0User';
import { deleteEstimate, getEstimates } from "../../../../utils/api/estimates-api";
import { EstimateData } from "../../../../utils/types/EstimateInterfaces";
import logger from "../../../../logging/logger";

import NoneFound from "../../../SharedComponents/NoneFound/NoneFound";
import EstimateListItem from "../../SharedEstimateComponents/EstimateListItem";
import Loading from "../../../SharedComponents/Loading/Loading";
import ErrorMessage from "../../../SharedComponents/ErrorMessage/ErrorMessage";
import EstimatesPagingControls from "../../SharedEstimateComponents/EstimatesPagingControls";
import ErrorModal from "../../../SharedComponents/ErrorModal/ErrorModal";

const PAGE_SIZE = 10; // Number of estimate drafts per page

interface PastEstimatesListProps {
    searchTerm: string;
    selectedTemplateId: string;
    setNoEstimatesAvailable: (noEstimatesAvailable: boolean) => void;
    setMaxEstimatesReached: (maxEstimatesReached: boolean) => void;
}

const PastEstimatesList = ({ searchTerm, selectedTemplateId, setNoEstimatesAvailable, setMaxEstimatesReached }: PastEstimatesListProps) => {
    // State and hooks
    const { auth0User, getAccessToken } = useAuth0User();
    const [pageNumber, setPageNumber] = useState(1);
    const [estimates, setEstimates] = useState<EstimateData[]>([]);
    const [error, setError] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [estimateRequestCompleted, setEstimateRequestCompleted] = useState(false);

    // Helper function to handle estimate deletion
    const handleEstimateDelete = async (estimateId: string) => {
        try {
            setDeleteError(false);
            const token = await getAccessToken();
            if (!token) return;
            await deleteEstimate(estimateId, token)
            setEstimates(estimates.filter((estimate: any) => estimate.id !== estimateId));
        }
        catch (error) {
            logger.trackException({
                properties: {
                    name: 'Estimate Delete Error',
                    page: 'Past Estimates',
                    description: 'Error deleting estimate',
                    error: error,
                },
            });
            console.error('Error deleting estimate:', error);
            setDeleteError(true);
        }
    };

    // Use debounced function for loading estimates
    const loadEstimates = useRef(
        _.debounce(
            async (pageSize: number, pageNumber: number, token: string, searchTerm: string, selectedTemplateId: string) => {
                setNoEstimatesAvailable(false);
                setEstimateRequestCompleted(false);
                try {
                    const estimateData = await getEstimates(pageSize, pageNumber, token, searchTerm, selectedTemplateId)
                    setEstimates(estimateData.estimates);
                    setMaxEstimatesReached(estimateData.maxEstimatesReached);
                    setNoEstimatesAvailable(estimateData.estimates.length === 0)
                    setEstimateRequestCompleted(true);
                }
                catch (error) {
                    // Handle error and log
                    logger.trackException({
                        properties: {
                            name: 'Estimate Retrieval Error',
                            page: 'Past Estimates',
                            description: 'Error retrieving estimates',
                            error: error,
                        },
                    });
                    console.error('Error retrieving estimates:', error);
                    setNoEstimatesAvailable(true);
                    setEstimateRequestCompleted(true);
                    setError(true);
                }
            },
            500
        )
    );

    // Fetch estimates on component mount or when dependencies change
    useEffect(() => {
        const fetchEstimates = async () => {
            const token = await getAccessToken();
            if (!token) return;
            loadEstimates.current(PAGE_SIZE, pageNumber, token, searchTerm, selectedTemplateId);
        }
        fetchEstimates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber, searchTerm, selectedTemplateId, auth0User?.sub]);

    // Render components based on state
    if (error) return <ErrorMessage dataName='Estimates' />;

    if (estimates.length === 0 && !estimateRequestCompleted && !error) {
        return <Loading />
    }

    if (estimates.length === 0 && estimateRequestCompleted && !error) {
        return <NoneFound item="estimates" />
    }

    return (
        <>
            <ErrorModal error={deleteError} setError={setDeleteError} />
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