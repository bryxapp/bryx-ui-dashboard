import { CanvasDesignData } from "../../../../../utils/types/CanvasInterfaces";
import Typography from "@mui/material/Typography";
import PreviewStage from "../../../../SharedComponents/Templates/PreviewStage/PreviewStage";


interface TemplatePreviewProps {
  canvasDesign: CanvasDesignData;
}

const TemplatePreview = ({ canvasDesign }: TemplatePreviewProps) => {

  return (
    <>
      <Typography variant="h4" color="gray">
        Template Snapshot
      </Typography>
      <Typography variant="subtitle1" color="gray">
        *Does not show preview of input values
      </Typography>
      <div style={{ height: 20 }}></div>
      <PreviewStage canvasDesign={canvasDesign} scale={.75} />
    </>
  );
};

export default TemplatePreview;
