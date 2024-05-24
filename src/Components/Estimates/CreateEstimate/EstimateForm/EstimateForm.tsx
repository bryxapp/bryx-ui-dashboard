import { useState } from 'react';
import { Button, Form, Tooltip, Typography } from 'antd';
import { TemplateData } from '../../../../utils/types/TemplateInterfaces';
import { EstimateFormFields } from '../../../../utils/types/EstimateInterfaces';
import EstimateName from './EstimateName/EstimateName';
import EstimateFormTextFieldsList from './EstimateFormTextFields/EstimateFromTextFieldsList';
import { TbEdit } from "react-icons/tb";
import EditFormOrder from './EditFormOrder/EditFormOrder';
import SubmitEstimate from './SubmitEstimate.tsx/SubmitEstimate';

const { Text } = Typography;

interface IEstimateFormProps {
    templateData: TemplateData;
    setCreating: any;
    setSaving: any;
    draftId: string;
    estimateName: string;
    setEstimateName: any;
    formInputs: EstimateFormFields;
    setFormInputs: any;
}

const EstimateForm = ({
    templateData,
    setCreating,
    setSaving,
    draftId,
    estimateName,
    setEstimateName,
    formInputs,
    setFormInputs
}: IEstimateFormProps) => {
    const [editing, setEditing] = useState(false);
    const handleEnableOrderEditing = () => {
        setEditing(true);
    };

    return (
        <Form layout="vertical" style={{ width: "90%" }}>
            <div style={{ flex: 2, display: "flex", justifyContent: "space-between" }}>
                <EstimateName estimateName={estimateName} setEstimateName={setEstimateName} disabled={editing} />
                {!editing && (
                    <Tooltip title="Edit Form">
                        <Button size="large" type="link" onClick={handleEnableOrderEditing}><TbEdit /></Button>
                    </Tooltip>
                )}
            </div>
            <Text type="secondary">Template: {templateData.friendlyName}</Text>
            {!editing && (
                <EstimateFormTextFieldsList
                    formInputs={formInputs}
                    setFormInputs={setFormInputs}
                />
            )}
            {editing && (<EditFormOrder setEditing={setEditing} templateId={templateData.id} friendlyName={templateData.friendlyName} />)}
            <div style={{ display: 'flex' }}>
                <SubmitEstimate
                    templateData={templateData}
                    setCreating={setCreating}
                    setSaving={setSaving}
                    draftId={draftId}
                    estimateName={estimateName}
                    formInputs={formInputs}
                    editing={editing} />
            </div>
        </Form>
    );
};

export default EstimateForm;
