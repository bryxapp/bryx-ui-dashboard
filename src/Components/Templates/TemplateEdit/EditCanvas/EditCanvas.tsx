import { useState, useEffect } from "react";
import CanvasToolbar from "../../Canvas/CanvasToolbar/CanvasToolbar";
import CanvasStage from "../../Canvas/CanvasStage/CanvasStage";
import { TemplateCreationState } from "../../../../Interfaces/TemplateCreationInterfaces";
import { getTemplate } from "../../../../utils/templates-api";
import { Typography } from "@mui/material";
import { useLocation } from 'react-router-dom';

const EditCanvas = ({ friendlyName }: any) => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const templateId = params.get('templateId');
    console.log(templateId);

    const [canvasDesign, setCanvasDesign] = useState<TemplateCreationState>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTemplate(templateId)
            .then((res) => {
                console.log(res.data)
                setCanvasDesign(res.data.canvasDesign);
                setLoading(false);
            });
    }, [templateId]);

    if (loading) {
        return (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                Loading...
            </Typography>
        );
    }

    return (
        <div>
            <CanvasToolbar canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} friendlyName={friendlyName} />
            <div style={{ padding: '1vh' }} />
            <CanvasStage canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
        </div>
    );
};

export default EditCanvas;