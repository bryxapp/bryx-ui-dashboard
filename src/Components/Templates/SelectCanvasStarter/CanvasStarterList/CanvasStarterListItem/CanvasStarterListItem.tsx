import { Typography } from '@mui/material';
import { CanvasStarterData } from '../../../../../utils/types/CanvasInterfaces';
import PreviewStage from '../../../../SharedComponents/Templates/PreviewStage/PreviewStage';
import Link from '../../../../SharedComponents/Link/Link'
interface CanvasStarterListItemProps {
  canvasStarter: CanvasStarterData;
}

const CanvasStarterListItem = ({ canvasStarter }: CanvasStarterListItemProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" color="gray">
        {canvasStarter.name}
      </Typography>
      <Link to={'/create-template?canvasStarterName=' + canvasStarter.name}>
        <PreviewStage canvasDesign={canvasStarter.canvasDesign} scale={0.33} />
      </Link>
    </div>
  );
};

export default CanvasStarterListItem;
