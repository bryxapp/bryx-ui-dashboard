import Button from '@mui/material/Button';
import { useAuth0User } from '../../../../utils/customHooks/useAuth0User';
import { updateTemplate, createTemplate } from '../../../../utils/api/templates-api';
import logger from '../../../../logging/logger';
import { useEffect, useState } from 'react';
import ErrorModal from '../../../SharedComponents/ErrorModal/ErrorModal';
import { isDesignChanged } from '../../../../utils/functions/CanvasFunctions';
import { Typography } from '@mui/material';

interface SaveTemplateButtonProps {
    isLoading: boolean;
    setIsLoading: React.SetStateAction<any>;
    canvasDesign: any;
    dataBaseCanvasDesign: any;
    setdataBaseCanvasDesign: React.SetStateAction<any>;
    friendlyName: string;
}

export default function SaveTemplateButton({
    isLoading,
    setIsLoading,
    canvasDesign,
    dataBaseCanvasDesign,
    setdataBaseCanvasDesign,
    friendlyName
}: SaveTemplateButtonProps) {
    const { getAccessToken } = useAuth0User();
    const [error, setError] = useState(false); // Error state
    const [saveButtonEnabled, setSaveButtonEnabled] = useState(true); // Disable save button if design hasn't changed

    useEffect(() => {
        // Effect for updating the save button's enabled state based on design change
        setSaveButtonEnabled(isDesignChanged(dataBaseCanvasDesign, canvasDesign));
    }, [dataBaseCanvasDesign, canvasDesign]);

    const handleSave = async () => {
        try {
            setIsLoading(true);
            const token = await getAccessToken();
            if (!token) {
                console.log("No token for posting template");
                return;
            }

            const params = new URLSearchParams(window.location.search);
            const templateId = params.get('templateId');

            if (templateId) {
                const updatedTemplate = await updateTemplate(templateId, canvasDesign, friendlyName, token);
                setdataBaseCanvasDesign(updatedTemplate.canvasDesign);
            } else {
                const newTemplate = await createTemplate(canvasDesign, friendlyName, token);
                setdataBaseCanvasDesign(newTemplate.canvasDesign);
                // Append templateId to URL for subsequent saves
                window.history.pushState(null, '', `?templateId=${newTemplate.id}`);
            }
        } catch (error) {
            logger.trackException({
                properties: {
                    name: "Template Save Error",
                    page: "Canvas",
                    description: "Error saving template",
                    error: error,
                },
            });
            setError(true);
            console.log("Error saving template:", error);
        } finally {
            setSaveButtonEnabled(isDesignChanged(dataBaseCanvasDesign, canvasDesign));
            setIsLoading(false); // Ensure loading state is reset whether the try block succeeds or fails
        }
    }

    if (isLoading) {
        return (
            <Button color="inherit" aria-label="save" disabled>
                Loading...
            </Button>
        );
    }

    return (
        <>
            <ErrorModal error={error} setError={setError} />
            <Button
                color="inherit"
                onClick={handleSave}
                disabled={!saveButtonEnabled} // Disable button if design hasn't changed
                sx={{
                    padding: '0 10px',
                    margin: '0 5px',
                    borderColor: saveButtonEnabled ? 'white' : 'grey', // Change border color based on design change
                    borderWidth: 1,
                    borderStyle: 'solid',
                    '&:hover': {
                        borderColor: 'white',
                        borderWidth: 2,
                    },
                }}
            >
                <Typography variant="h6">
                    Save
                </Typography>
            </Button>
        </>
    );
}