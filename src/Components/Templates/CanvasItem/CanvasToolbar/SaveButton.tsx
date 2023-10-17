import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { useAuth0User } from '../../../../utils/customHooks/useAuth0User';
import { updateTemplate, createTemplate } from '../../../../utils/api/templates-api';


interface SaveTemplateButtonProps {
    isLoading: boolean;
    setIsLoading: React.SetStateAction<any>;
    canvasDesign: any;
    friendlyName: string;
}

export default function SaveTemplateButton({ isLoading, setIsLoading, canvasDesign, friendlyName }: SaveTemplateButtonProps) {
    const { getAccessToken } = useAuth0User();

    const navigate = useNavigate();
    const handleSave = async () => {
        //Show loader until post is complete
        setIsLoading(true)
        const token = await getAccessToken();
        if (!token) {
            console.log("No token for posting template");
            return;
        }
        const params = new URLSearchParams(window.location.search);
        const templateId = params.get('templateId');
        if (templateId) {
            await updateTemplate(templateId, canvasDesign, friendlyName, token);
        } else {
            await createTemplate(canvasDesign, friendlyName, token);
        }
        navigate("/templates");
    }

    if (isLoading) {
        return (
            <Tooltip title="Saving..." placement="bottom">
                <IconButton edge="end" color="inherit" aria-label="save">
                    Loading...
                </IconButton>
            </Tooltip>

        );
    }
    return (
        <Tooltip title="Save your template" placement="bottom">
            <IconButton edge="end" color="inherit" aria-label="save" onClick={handleSave}>
                Save
            </IconButton>
        </Tooltip>
    );
}