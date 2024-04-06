import { CanvasDesignData } from "../../../../../utils/types/CanvasInterfaces";
import { Typography } from "antd";
import PreviewStage from "../../../../SharedComponents/Templates/PreviewStage/PreviewStage";


interface TemplatePreviewProps {
  canvasDesign: CanvasDesignData;
}

const TemplatePreview = ({ canvasDesign }: TemplatePreviewProps) => {

  return (
    <>
      <Typography.Title level={4} style={{margin:0}}>
        Template Snapshot
      </Typography.Title>
      <Typography.Text>
        *Does not show preview of input values
      </Typography.Text>
      <div style={{ height: 20 }}></div>
      <PreviewStage canvasDesign={canvasDesign} scale={.75} />
    </>
  );
};

export default TemplatePreview;
