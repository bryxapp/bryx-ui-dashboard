import { Button } from '@mui/material';
import { createEstimate } from '../../../../../utils/api/estimates-api';
import { deleteEstimateDraft } from '../../../../../utils/api/estimate-drafts-api';
import { useAuth0User } from '../../../../../utils/customHooks/useAuth0User';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logger from '../../../../../logging/logger';
import ErrorModal from '../../../../SharedComponents/ErrorModal/ErrorModal';

interface SubmitButtonProps {
    templateData: any;
    estimateName: string;
    fieldValues: any;
    draftId: string;
    setCreating: any;
}

const SubmitButton = ({ templateData, estimateName, fieldValues, draftId, setCreating }: SubmitButtonProps) => {
    const [error, setError] = useState(false);
    const { getAccessToken } = useAuth0User();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setCreating(true);
        setError(false);
        try {
            if (!templateData) return;
            const token = await getAccessToken()
            if (!token) return;
            const createdEstimate = await createEstimate(templateData, estimateName, fieldValues, token);
            if (draftId) deleteEstimateDraft(draftId, token); //delete the draft if it exists
            navigate("/view-estimate?estimateId=" + createdEstimate.id);
        } catch (error) {
            logger.trackException({
                properties: {
                    name: "Estimate Creation Error",
                    page: "Estimate Creation",
                    description: "Error creating estimate",
                    error: error,
                },
            });
            setError(true);
            console.error("Error creating estimate:", error);
        } finally {
            setCreating(false);
        }
    };

    return (
        <>
            <ErrorModal error={error} setError={setError} />
            <Button variant="contained" size="large" onClick={() => handleSubmit()}>Submit</Button>
        </>
    );
};

export default SubmitButton;
