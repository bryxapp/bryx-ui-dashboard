import { useState } from 'react';
import { Form } from 'antd';
import { TemplateData } from '../../../../utils/types/TemplateInterfaces';
import { EstimateFormFields } from '../../../../utils/types/EstimateInterfaces';
import EstimateFormTextFieldsList from './EstimateFormTextFields/EstimateFromTextFieldsList';
import EditFormOrder from './EditFormOrder/EditFormOrder';
import SubmitEstimate from './SubmitEstimate.tsx/SubmitEstimate';

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
    return (
        <Form layout="vertical" style={{ width: "90%" }}>
            {!editing && (
                <>
                    <EstimateFormTextFieldsList
                        formInputs={formInputs}
                        setFormInputs={setFormInputs}
                        templateId={templateData.id}
                        templateFriendlyName={templateData.friendlyName}
                        editing={editing}
                        setEditing={setEditing}
                        estimateName={estimateName}
                        setEstimateName={setEstimateName}
                    />
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
                </>
            )}
            {editing && (<EditFormOrder
                templateId={templateData.id}
                templateFriendlyName={templateData.friendlyName}
                editing={editing}
                setEditing={setEditing}
                estimateName={estimateName}
                setEstimateName={setEstimateName} />)}
        </Form>
    );
};

export default EstimateForm;
