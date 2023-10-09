import { useState, useEffect } from "react";
import { CanvasDesignData } from "../../../utils/types/CanvasInterfaces";
import { getTemplate } from "../../../utils/api/templates-api";
import { useLocation } from 'react-router-dom';
import CanvasToolbar from "./CanvasToolbar/CanvasToolbar";
import CanvasStage from "./CanvasStage/CanvasStage";
import TemplateName from "./../TemplateName/TemplateName";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAccessToken } from "../../../utils/customHooks/useAccessToken";

const CanvasItem = () => {
    const { getAccessToken } = useAccessToken();
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const [friendlyName, setFriendlyName] = useState("New Template");
    const [color, setColor] = useState('#000000');
    const [canvasDesign, setCanvasDesign] = useState<CanvasDesignData>({
        Shapes: [],
        selectedId: null,
    });
    useEffect(() => {
        // fetch template data if the canvas is not new
        const params = new URLSearchParams(location.search);
        const templateId = params.get('templateId');
        if (templateId) {
            getAccessToken().then((token) => {
                if (!token) return;

                getTemplate(templateId, token).then((res) => {
                    setCanvasDesign(res.data.canvasDesign);
                    setFriendlyName(res.data.friendlyName);
                    setLoading(false);
                });
            });
        }
        else {
            setLoading(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search]);

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
                    color={color}
                    setColor={setColor}
                />
            </div>
            <Box sx={{ height: '1vh' }} />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <CanvasStage
                    canvasDesign={canvasDesign}
                    setCanvasDesign={setCanvasDesign}
                    color={color}
                    setColor={setColor} />
            </div>
        </div>
    );
};

export default CanvasItem;
