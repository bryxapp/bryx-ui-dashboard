import { useState, useEffect } from "react";
import CanvasToolbar from "../../Canvas/CanvasToolbar/CanvasToolbar";
import CanvasStage from "../../Canvas/CanvasStage/CanvasStage";
import { TemplateCreationState } from "../../../../utils/types/TemplateCreationInterfaces";
import { getTemplate } from "../../../../utils/templates-api";
import { Typography } from "@mui/material";
import { useLocation } from 'react-router-dom';
import { updateTemplate } from "../../../../utils/templates-api";
import { useAuth0 } from "@auth0/auth0-react";

const EditCanvas = ({ friendlyName, setFriendlyName }: any) => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const templateId = params.get('templateId');

    const { user } = useAuth0();
    const userName = user?.email ? user.email : "";

    const [canvasDesign, setCanvasDesign] = useState<TemplateCreationState>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (templateId) {
            getTemplate(templateId)
                .then((res) => {
                    setCanvasDesign(res.data.canvasDesign);
                    setFriendlyName(res.data.friendlyName);
                    setLoading(false);
                });
        }
        else {
            setLoading(false);
        }
    }, [templateId, setFriendlyName]);

    if (loading) {
        return (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                Loading...
            </Typography>
        );
    }

    const updateTemplateOnSave = () => {
        //update template
        if(templateId){
            return updateTemplate(templateId, canvasDesign, friendlyName,userName);
        }
    }

    return (
        <div>
            <CanvasToolbar canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} friendlyName={friendlyName} postTemplate={updateTemplateOnSave} />
            <div style={{ padding: '1vh' }} />
            <CanvasStage canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
        </div>
    );
};

export default EditCanvas;