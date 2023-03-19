import { useState, useEffect } from "react";
import { TemplateCreationState } from "../../../utils/types/TemplateCreationInterfaces";
import { createTemplate, updateTemplate, getTemplate } from "../../../utils/templates-api";
import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from 'react-router-dom';
import CanvasToolbar from "./CanvasToolbar/CanvasToolbar";
import CanvasStage from "./CanvasStage/CanvasStage";
import TemplateName from "./../TemplateName/TemplateName";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface CanvasProps {
    isNewCanvas: boolean;
}

const CanvasItem = ({ isNewCanvas }: CanvasProps) => {
    const { user } = useAuth0();
    const userName = user?.email || "";
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const [templateId, setTemplateId] = useState<string | null>(null);
    const [friendlyName, setFriendlyName] = useState("New Template");
    const [color, setColor] = useState('#000000');
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [canvasDesign, setCanvasDesign] = useState<TemplateCreationState>({
        Rectangles: [],
        Circles: [],
        Lines: [],
        TextInputs: [],
        TextFields: [],
        selectedId: null,
    });

    useEffect(() => {
        // fetch template data if the canvas is not new
        if (!isNewCanvas) {
            const params = new URLSearchParams(location.search);
            const templateId = params.get('templateId');
            if (templateId) {
                setTemplateId(templateId);
                getTemplate(templateId).then((res) => {
                    setCanvasDesign(res.data.canvasDesign);
                    setFriendlyName(res.data.friendlyName);
                    setLoading(false);
                });
            }
        } else {
            setLoading(false);
        }
    }, [isNewCanvas, location.search]);

    const OnSave = () => {
        // create or update template
        if (isNewCanvas) {
            return createTemplate(canvasDesign, friendlyName, userName);
        } else if (templateId) {
            return updateTemplate(templateId, canvasDesign, friendlyName, userName);
        }
    };

    if (loading) {
        // show loading message while data is being fetched
        return (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                Loading...
            </Typography>
        );
    }

    // render canvas components when data is available
    return (
        <div>
            <TemplateName friendlyName={friendlyName} setFriendlyName={setFriendlyName} />
            <Box sx={{ height: '2vh' }} />
            <div style={{ width: '100%' }}>
                <CanvasToolbar
                    canvasDesign={canvasDesign}
                    setCanvasDesign={setCanvasDesign}
                    friendlyName={friendlyName}
                    postTemplate={OnSave}
                    color={color}
                    setColor={setColor}
                    selectedId={selectedId}
                />
            </div>
            <Box sx={{ height: '1vh' }} />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <CanvasStage
                    canvasDesign={canvasDesign}
                    setCanvasDesign={setCanvasDesign}
                    color={color}
                    setColor={setColor}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId} />
            </div>
        </div>
    );
};

export default CanvasItem;
