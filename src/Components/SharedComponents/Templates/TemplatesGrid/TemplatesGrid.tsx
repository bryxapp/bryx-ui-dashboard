import React, { useEffect, useState, } from 'react';
import TemplatesListItem from './TemplateItem/TemplateItem';
import { getTemplates, deleteTemplate, createTemplate } from '../../../../utils/api/templates-api';
import { TemplateData } from '../../../../utils/types/TemplateInterfaces';
import { useAuth0User } from '../../../../utils/customHooks/useAuth0User';
import logger from '../../../../logging/logger';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import ErrorModal from '../../ErrorModal/ErrorModal';
import { Col, Empty, Row, Typography } from 'antd';
interface TemplatesGridProps {
    setMaxTemplatesReached?: ((value: boolean) => void);
    baseUrl: string;
    showActions?: boolean;
}

const TemplatesGrid: React.FC<TemplatesGridProps> = ({ setMaxTemplatesReached, baseUrl, showActions = false }) => {
    const [templates, setTemplates] = useState<TemplateData[]>([]);
    const { auth0User, getAccessToken } = useAuth0User();
    const [error, setError] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [copyError, setCopyError] = useState(false);
    const [templateRequestCompleted, setTemplateRequestCompleted] = useState(false);
    const [templatesCount, setTemplatesCount] = useState<number>(0);

    useEffect(() => {
        const fetchTemplates = async () => {
            setTemplateRequestCompleted(false);
            try {
                setError(false);
                if (!auth0User) return;
                const token = await getAccessToken();
                if (!token) return;
                const templateData = await getTemplates(token);
                setTemplates(templateData.templates);
                if (setMaxTemplatesReached) {
                    setMaxTemplatesReached(templateData.maxTemplatesReached);
                }
                if (setTemplatesCount) {
                    setTemplatesCount(templateData.templates.length);
                }
            } catch (error) {
                logger.trackException({
                    properties: {
                        name: "Templates Fetch Error",
                        page: "Templates",
                        description: "Error fetching templates",
                        error: error,
                    },
                });
                setError(true);
                console.error('Error retrieving estimates:', error);
            } finally {
                setTemplateRequestCompleted(true);
            }
        };
        fetchTemplates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth0User?.sub]);

    const handleTemplateDelete = async (templateId: string) => {
        try {
            setDeleteError(false);
            const token = await getAccessToken();
            if (!token) return;

            await deleteTemplate(templateId, token);
            setTemplates(prevTemplates => prevTemplates.filter(template => template.id !== templateId));
        } catch (error) {
            logger.trackException({
                properties: {
                    name: "Template Delete Error",
                    page: "Templates",
                    description: "Error deleting template",
                    error: error,
                },
            });
            setDeleteError(true);
            console.error('Error deleting template:', error);
        }
    };

    const handleTemplateCopy = async (templateId: string) => {
        try {
            setCopyError(false);
            const token = await getAccessToken();
            if (!token) throw new Error('No token found');
            const template = templates.find(template => template.id === templateId);
            if (!template) throw new Error('Template not found');
            await createTemplate(template.canvasDesign, template.friendlyName + ' (copy)', token);
            const templateData = await getTemplates(token);
            setTemplates(templateData.templates);
        } catch (error) {
            logger.trackException({
                properties: {
                    name: "Template Copy Error",
                    page: "Templates",
                    description: "Error copying template",
                    error: error,
                },
            });
            setCopyError(true);
            console.error('Error copying template:', error);
        }
    }

    if (!templateRequestCompleted)
        return <Typography.Title level={4} style={{ textAlign: 'center' }}>Loading...</Typography.Title>;

    if (error) return <ErrorMessage dataName='templates' />;

    if (templatesCount === 0)
        return (
            <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{ height: 100 }}
                description={
                    <Typography.Title level={5}>
                        You don't have any templates yet
                    </Typography.Title>
                }
            >
            </Empty>
        );

    return (
        <>
            <ErrorModal error={deleteError} setError={setDeleteError} content="Error deleting template" />
            <ErrorModal error={copyError} setError={setCopyError} content="Error copying template" />
            <Row gutter={[16, 16]}>
                {templates.map(template => (
                    <Col xs={24} sm={12} md={8} key={template.id}>
                        <TemplatesListItem
                            template={template}
                            handleTemplateDelete={handleTemplateDelete}
                            handleTemplateCopy={handleTemplateCopy}
                            baseUrl={baseUrl}
                            showActions={showActions}
                        />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default TemplatesGrid;
