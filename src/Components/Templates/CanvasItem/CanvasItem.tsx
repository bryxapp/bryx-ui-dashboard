import { useState, useEffect } from "react";
import { CanvasDesignData } from "../../../utils/types/CanvasInterfaces";
import { getTemplate } from "../../../utils/api/templates-api";
import { useLocation } from 'react-router-dom';
import CanvasToolbar from "./CanvasToolbar/CanvasToolbar";
import CanvasStage from "./CanvasStage/CanvasStage";
import TemplateName from "./../TemplateName/TemplateName";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAuth0User } from "../../../utils/customHooks/useAuth0User";
import logger from "../../../logging/logger";
import ErrorMessage from "../../SharedComponents/ErrorMessage/ErrorMessage";
import { createEmptyCanvasDesign } from "../../../utils/types/ShapesFactory";
import { useCanvasDesignContext } from "../../../utils/contexts/canvasDesignContext";

const CanvasItem = () => {
    const { auth0User, getAccessToken } = useAuth0User();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [friendlyName, setFriendlyName] = useState("New Template");
    const [dataBaseFriendlyName, setDataBaseFriendlyName] = useState("New Template");
    const [dataBaseCanvasDesign, setdataBaseCanvasDesign] = useState<CanvasDesignData>(createEmptyCanvasDesign(8.5, 11));
    const [error, setError] = useState(false);
    const { setCanvasDesign } = useCanvasDesignContext();

    useEffect(() => {
        const fetchTemplate = async () => {
            setLoading(true);
            // fetch template data if the canvas is not new
            const params = new URLSearchParams(location.search);
            const templateId = params.get('templateId');
            if (templateId) {
                try {
                    setError(false);
                    if (!auth0User) return;
                    const token = await getAccessToken();
                    if (!token) return;
                    const fetchedTemplate = await getTemplate(templateId, token);
                    setCanvasDesign(fetchedTemplate.canvasDesign);
                    const canvasDesignCopy = JSON.parse(JSON.stringify(fetchedTemplate.canvasDesign));
                    setdataBaseCanvasDesign(canvasDesignCopy);
                    setFriendlyName(fetchedTemplate.friendlyName);
                    setDataBaseFriendlyName(fetchedTemplate.friendlyName);
                    setLoading(false);
                } catch (error) {
                    logger.trackException({
                        properties: {
                            name: "Template Fetch Error",
                            page: "Canvas",
                            description: "Error fetching template",
                            error: error,
                        },
                    });
                    setError(true);
                    console.log("Error fetching template:", error);
                }
            }
            else {
                setLoading(false);
            }
        }
        fetchTemplate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.search, auth0User?.sub]);

    if (loading) {
        // show loading message while data is being fetched
        return (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
                Loading...
            </Typography>
        );
    }

    if (error) return <ErrorMessage dataName="template" />;

    // render canvas components when data is available
    return (
        <div>
            <TemplateName friendlyName={friendlyName} setFriendlyName={setFriendlyName} />
            <Box sx={{ height: '2vh' }} />
            <div style={{ width: '100%' }}>
                <CanvasToolbar
                    friendlyName={friendlyName}
                    dataBaseCanvasDesign={dataBaseCanvasDesign}
                    setDataBaseCanvasDesign={setdataBaseCanvasDesign}
                    databaseFriendlyName={dataBaseFriendlyName}
                    setDataBaseFriendlyName={setDataBaseFriendlyName}
                />
            </div>
            <Box sx={{ height: '1vh' }} />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <CanvasStage />
            </div>
        </div>
    );
};

export default CanvasItem;
