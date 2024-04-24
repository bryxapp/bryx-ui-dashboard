import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { EstimateTemplateUsedData } from "../../../../../utils/types/TemplateInterfaces";
import { useAuth0User } from '../../../../../utils/customHooks/useAuth0User';
import { getUsedTemplates } from "../../../../../utils/api/estimates-api";

const { Option } = Select;

interface PastEstimatesSearchProps {
    disabled: boolean;
    selectedTemplateId: string;
    setSelectedTemplateId: (templateId: string) => void;
}

const TemplatesDropdown: React.FC<PastEstimatesSearchProps> = ({ disabled, selectedTemplateId, setSelectedTemplateId }) => {

    const { auth0User, getAccessToken } = useAuth0User();
    const [templatesUsed, setTemplatesUsed] = useState<EstimateTemplateUsedData[]>([]);
    const [templateRequestCompleted, setTemplateRequestCompleted] = useState(false);
    const [errorRetrievingTemplates, setErrorRetrievingTemplates] = useState(false);

    const handleTemplateIdFilter = (value: string) => {
        setSelectedTemplateId(value);
    };

    useEffect(() => {
        const fetchUsedTemplates = async () => {
            setTemplateRequestCompleted(false);
            setErrorRetrievingTemplates(false);  // Reset the error state at the start
            const token = await getAccessToken();
            if (!token) return;
            try {
                const fetchedTemplates = await getUsedTemplates(token);
                setTemplatesUsed(fetchedTemplates);
            }
            catch (error) {
                setErrorRetrievingTemplates(true);
                console.error('Error retrieving templates:', error);
            }
            finally {
                setTemplateRequestCompleted(true);
            }
        };
        fetchUsedTemplates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [auth0User?.sub]);

    return (
            <Select
                disabled={disabled}
                placeholder="Template ID"
                value={selectedTemplateId}
                onChange={handleTemplateIdFilter}
                style={{ width: "10em" }}
            >
                <Option value="">All</Option>
                {!templateRequestCompleted && (
                    <Option value="" disabled>Loading...</Option>
                )}
                {errorRetrievingTemplates ? (
                    <Option value="" disabled>Error loading templates</Option>
                ) : (
                    templatesUsed.map(({ templateId, templateFriendlyName }) => (
                        <Option key={templateId} value={templateId}>
                            {templateFriendlyName}
                        </Option>
                    ))
                )}
            </Select>
    );
};

export default TemplatesDropdown;