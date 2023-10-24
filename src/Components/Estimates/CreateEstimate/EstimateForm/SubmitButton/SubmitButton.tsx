import { Button } from '@mui/material';
import { createEstimate } from '../../../../../utils/api/estimates-api';
import { deleteEstimateDraft } from '../../../../../utils/api/estimate-drafts-api';
import { useAuth0User } from '../../../../../utils/customHooks/useAuth0User';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface SubmitButtonProps {
    templateData: any;
    estimateName: string;
    fieldValues: any;
    draftId: string;
    setCreating: any;
}

const SubmitButton = ({templateData,estimateName,fieldValues, draftId,setCreating}:SubmitButtonProps) => {
    const [error, setError] = useState<string | null>(null); // Error state
    const { getAccessToken } = useAuth0User();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setCreating(true);
        try {
            if (!templateData) return;
            const token = await getAccessToken()
            if (!token) return;
            const createdEstimate = await createEstimate(templateData, estimateName, fieldValues, token);
            if (draftId) deleteEstimateDraft(draftId, token); //delete the draft if it exists
            // Wait for 2 seconds before navigating to the estimate page
            await new Promise((resolve) => setTimeout(resolve, 2000));
            navigate("/view-estimate?estimateId=" + createdEstimate.id);
        } catch (error) {
            setError("Error creating estimate");
            console.error("Error creating estimate:", error);
        } finally {
            setCreating(false);
        }
    };

    if (error) {
        return (<div>{error}</div>)
    }
    return (
        <Button variant="contained" size="large" onClick={() => handleSubmit()}>Submit</Button>
    );
};

export default SubmitButton;
