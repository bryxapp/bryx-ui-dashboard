import { Button } from '@mui/material';
import { useAuth0User } from '../../../../../utils/customHooks/useAuth0User';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createEstimateDraft, updateEstimateDraft } from '../../../../../utils/api/estimate-drafts-api';
import ErrorMessage from '../../../../SharedComponents/ErrorMessage/ErrorMessage';
import logger from '../../../../../logging/logger';

interface SaveAsDraftButtonProps {
    templateData: any;
    estimateName: string;
    fieldValues: any;
    draftId: string;
    setSaving: any;
}

const SaveAsDraftButton = ({ templateData, estimateName, fieldValues, draftId, setSaving }: SaveAsDraftButtonProps) => {
    const [error, setError] = useState(false);
    const { getAccessToken } = useAuth0User();
    const navigate = useNavigate();

    const handleSaveAsDraft = async () => {
        setSaving(true);
        try {
            if (!templateData) {
                return;
            }
            const token = await getAccessToken()
            if (!token) return;
            if (!draftId) {
                await createEstimateDraft(templateData.id, estimateName, fieldValues, token);
            }
            else {
                await updateEstimateDraft(templateData.id, estimateName, fieldValues, draftId, token);
            }
            setError(false);
            navigate("/?tab=1");
        } catch (error) {
            logger.trackException({
                properties: {
                    name: "Estimate Draft Error",
                    page: "Estimate Draft",
                    description: "Error saving estimate draft",
                    error: error,
                },
            });
            setError(true);
            console.error("Error Saving Estimate Draft:", error);
        } finally {
            setSaving(false);
        }
    };

    if (error) return <ErrorMessage dataName='Estimate Draft'/>;

    if (draftId) return (<Button variant="contained" size="large" onClick={() => handleSaveAsDraft()}>Save As Draft</Button>);
    else {
        return (<Button variant="contained" size="large" onClick={() => handleSaveAsDraft()}>Update Draft</Button>)
    }
};

export default SaveAsDraftButton;
