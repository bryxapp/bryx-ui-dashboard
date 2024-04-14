import { CanvasDesignData } from "../../../../../utils/types/CanvasInterfaces";
import { Typography } from "antd";
import PreviewStage from "../../../../SharedComponents/Templates/PreviewStage/PreviewStage";
import { EstimateFormFields } from "../../../../../utils/types/EstimateInterfaces";


interface TemplatePreviewProps {
  canvasDesign: CanvasDesignData;
  formInputs?: EstimateFormFields
}

const TemplatePreview = ({ canvasDesign, formInputs }: TemplatePreviewProps) => {

  return (
    <>
      <Typography.Title level={4} style={{margin:0}}>
        Template Snapshot
      </Typography.Title>
      <div style={{ height: 20 }}></div>
      <PreviewStage canvasDesign={canvasDesign} scale={.8} formInputs={formInputs}/>
    </>
  );
};

export default TemplatePreview;
