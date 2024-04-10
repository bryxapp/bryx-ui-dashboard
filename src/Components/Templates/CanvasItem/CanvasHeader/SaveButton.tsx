import { useAuth0User } from '../../../../utils/customHooks/useAuth0User';
import { updateTemplate, createTemplate } from '../../../../utils/api/templates-api';
import logger from '../../../../logging/logger';
import { useEffect, useState } from 'react';
import ErrorModal from '../../../SharedComponents/ErrorModal/ErrorModal';
import { isTemplateChanged } from '../../../../utils/canvasUtils';
import { Button, message } from 'antd';
import { useCanvasDesignContext } from '../../../../utils/contexts/canvasDesignContext';

interface SaveTemplateButtonProps {
    isLoading: boolean;
    setIsLoading: React.SetStateAction<any>;
    dataBaseCanvasDesign: any;
    setDataBaseCanvasDesign: React.SetStateAction<any>;
    friendlyName: string;
    databaseFriendlyName: string;
    setDatabaseFriendlyName: React.SetStateAction<any>;
    templateId: string | null;
    setTemplateId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function SaveTemplateButton({
    isLoading,
    setIsLoading,
    dataBaseCanvasDesign,
    setDataBaseCanvasDesign,
    friendlyName,
    databaseFriendlyName,
    setDatabaseFriendlyName,
    templateId,
    setTemplateId
}: SaveTemplateButtonProps) {
    const { getAccessToken } = useAuth0User();
    const [error, setError] = useState(false); // Error state
    const [saveButtonEnabled, setSaveButtonEnabled] = useState(true); // Disable save button if design hasn't changed
    const { canvasDesign } = useCanvasDesignContext();

    useEffect(() => {
        // Effect for updating the save button's enabled state based on design change
        setSaveButtonEnabled(isTemplateChanged(dataBaseCanvasDesign, canvasDesign, friendlyName, databaseFriendlyName));
    }, [dataBaseCanvasDesign, canvasDesign, friendlyName, databaseFriendlyName]);

    const handleSave = async () => {
        try {
            setIsLoading(true);
            const token = await getAccessToken();
            if (!token) {
                console.log("No token for posting template");
                return;
            }

            if (templateId) {
                const updatedTemplate = await updateTemplate(templateId, canvasDesign, friendlyName, token);
                setDataBaseCanvasDesign(updatedTemplate.canvasDesign);
                setDatabaseFriendlyName(updatedTemplate.friendlyName);
            } else {
                const newTemplate = await createTemplate(canvasDesign, friendlyName, token);
                setDataBaseCanvasDesign(newTemplate.canvasDesign);
                setDatabaseFriendlyName(newTemplate.friendlyName);
                setTemplateId(newTemplate.id);
                // Append templateId to URL for subsequent saves
                window.history.pushState(null, '', `?templateId=${newTemplate.id}`);
            }
            message.success({
                content: 'Template saved successfully',
                duration: 3, // Duration in seconds
            });

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
            setSaveButtonEnabled(isTemplateChanged(dataBaseCanvasDesign, canvasDesign, friendlyName, databaseFriendlyName));
            setIsLoading(false); // Ensure loading state is reset whether the try block succeeds or fails
        }
    }

    return (
        <>
            <ErrorModal error={error} setError={setError} content="Error saving template" />
            <Button
                type="primary"
                size="large"
                onClick={handleSave}
                disabled={!saveButtonEnabled || isLoading}
                loading={isLoading}
            >
                Save
            </Button>
        </>
    );
}