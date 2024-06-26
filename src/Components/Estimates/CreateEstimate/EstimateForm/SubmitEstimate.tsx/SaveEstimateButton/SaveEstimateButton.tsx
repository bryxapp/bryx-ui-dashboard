import { Button } from 'antd';
import { createEstimate } from '../../../../../../utils/api/estimates-api';
import { deleteEstimateDraft } from '../../../../../../utils/api/estimate-drafts-api';
import { useAuth0User } from '../../../../../../utils/customHooks/useAuth0User';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logger from '../../../../../../logging/logger';
import ErrorModal from '../../../../../SharedComponents/ErrorModal/ErrorModal';
import { EstimateFormFields } from '../../../../../../utils/types/EstimateInterfaces';

interface SubmitButtonProps {
    templateData: any;
    estimateName: string;
    formInputs: EstimateFormFields;
    draftId: string;
    setCreating: any;
    disabled?: boolean;
}

const SaveEstimateButton = ({ templateData, estimateName, formInputs, draftId, setCreating, disabled }: SubmitButtonProps) => {
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
            const createdEstimate = await createEstimate(templateData, estimateName, formInputs, token);
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
            <ErrorModal error={error} setError={setError} content="Error creating estimate" />
            <Button type="primary" size="large" onClick={() => handleSubmit()} disabled={disabled}>Submit</Button>
        </>
    );
};

export default SaveEstimateButton;
