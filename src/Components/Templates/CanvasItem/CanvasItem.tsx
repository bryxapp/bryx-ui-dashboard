import { useState, useEffect } from "react";
import { CanvasDesignData } from "../../../utils/types/CanvasInterfaces";
import { getTemplate } from "../../../utils/api/templates-api";
import { useLocation } from 'react-router-dom';
import CanvasStage from "./CanvasStage/CanvasStage";
import { Typography, Layout, theme } from "antd";
import { useAuth0User } from "../../../utils/customHooks/useAuth0User";
import logger from "../../../logging/logger";
import ErrorMessage from "../../SharedComponents/ErrorMessage/ErrorMessage";
import { createEmptyCanvasDesign } from "../../../utils/types/ShapesFactory";
import { useCanvasDesignContext } from "../../../utils/contexts/canvasDesignContext";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import CanvasToolbar from "./ShapesToolbar/CanvasToolbar";
import CanvasHeader from "./CanvasHeader/CanvasHeader";


const CanvasItem = () => {
    const { auth0User, getAccessToken } = useAuth0User();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [friendlyName, setFriendlyName] = useState("New Template");
    const [dataBaseFriendlyName, setDataBaseFriendlyName] = useState("New Template");
    const [dataBaseCanvasDesign, setdataBaseCanvasDesign] = useState<CanvasDesignData>(createEmptyCanvasDesign(8.5, 11));
    const [error, setError] = useState(false);
    const { setCanvasDesign, setSelectedId } = useCanvasDesignContext();
    const [isLoading, setIsLoading] = useState(false);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


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
                    setSelectedId(null);
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
            <Typography.Title level={2}>
                Loading...
            </Typography.Title>
        );
    }

    if (error) return <ErrorMessage dataName="template" />;

    // render canvas components when data is available
    return (
        <Layout>
            <Content>
                <CanvasHeader 
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    friendlyName={friendlyName}
                    setFriendlyName={setFriendlyName}
                    dataBaseCanvasDesign={dataBaseCanvasDesign}
                    setDataBaseCanvasDesign={setdataBaseCanvasDesign}
                    dataBaseFriendlyName={dataBaseFriendlyName}
                    setDataBaseFriendlyName={setDataBaseFriendlyName}
                />
            </Content>
            <Layout style={{ padding: '20px 0 15px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}>
                <Sider style={{ background: colorBgContainer }} width={200}>
                    <CanvasToolbar isLoading={isLoading} />
                </Sider>
                <Content>
                    <CanvasStage />
                </Content>
            </Layout>
        </Layout>
    );
};

export default CanvasItem;
