import { Button } from '@mui/material';
import { useAuth0User } from '../../../../../utils/customHooks/useAuth0User';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createEstimateDraft, updateEstimateDraft } from '../../../../../utils/api/estimate-drafts-api';

interface SaveAsDraftButtonProps {
    templateData: any;
    estimateName: string;
    fieldValues: any;
    draftId: string;
    setSaving: any;
}

const SaveAsDraftButton = ({ templateData, estimateName, fieldValues, draftId, setSaving }: SaveAsDraftButtonProps) => {
    const [error, setError] = useState<string | null>(null); // Error state
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
            navigate("/?tab=1");
        } catch (error) {
            setError("Error Saving Estimate Draft");
            console.error("Error Saving Estimate Draft:", error);
        } finally {
            setSaving(false);
        }
    };

    if (error) {
        return (<div>{error}</div>)
    }

    if (draftId) return (<Button variant="contained" size="large" onClick={() => handleSaveAsDraft()}>Save As Draft</Button>);
    else {
        return (<Button variant="contained" size="large" onClick={() => handleSaveAsDraft()}>Update Draft</Button>)
    }
};

export default SaveAsDraftButton;
