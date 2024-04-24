import { TemplateData } from '../../../../../utils/types/TemplateInterfaces';
import { EstimateFormFields } from '../../../../../utils/types/EstimateInterfaces';
import SaveEstimateDraftButton from './SaveEstimateDraftButton/SaveEstimateDraftButton';
import SaveEstimateButton from './SaveEstimateButton/SaveEstimateButton';

interface ISubmitEstimateProps {
    templateData: TemplateData;
    setCreating: any;
    setSaving: any;
    draftId: string;
    estimateName: string;
    formInputs: EstimateFormFields;
    editing: boolean;
}

const SubmitEstimate = ({
    templateData,
    setCreating,
    setSaving,
    draftId,
    estimateName,
    formInputs,
    editing
}: ISubmitEstimateProps) => {
    return (
        <>
            <SaveEstimateButton templateData={templateData} estimateName={estimateName} formInputs={formInputs} draftId={draftId} setCreating={setCreating} disabled={editing} />
            <span style={{ width: 20 }}></span>
            <SaveEstimateDraftButton templateData={templateData} estimateName={estimateName} formInputs={formInputs} draftId={draftId} setSaving={setSaving} disabled={editing} />
        </>
    );
};

export default SubmitEstimate;
