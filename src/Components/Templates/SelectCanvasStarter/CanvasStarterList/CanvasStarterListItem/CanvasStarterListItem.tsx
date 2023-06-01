import { Link, Typography } from '@mui/material';
import { CanvasStarterData } from '../../../../../utils/types/CanvasInterfaces';
import PreviewStage from '../../../../SharedComponents/PreviewStage/PreviewStage';

interface CanvasStarterListItemProps {
  canvasStarter: CanvasStarterData;
}

const CanvasStarterListItem = ({ canvasStarter }: CanvasStarterListItemProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" color="gray">
        {canvasStarter.name}
      </Typography>
      <Link href={'/create-template?canvasStarterName=' + canvasStarter.name} underline="none">
        <PreviewStage canvasDesign={canvasStarter.canvasDesign} scale={0.33} />
      </Link>
    </div>
  );
};

export default CanvasStarterListItem;
