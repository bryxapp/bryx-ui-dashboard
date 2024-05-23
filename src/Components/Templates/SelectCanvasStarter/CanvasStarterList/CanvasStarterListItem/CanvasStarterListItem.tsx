import { Typography } from 'antd';
import { CanvasStarterData } from '../../../../../utils/types/CanvasInterfaces';
import PreviewStage from '../../../../SharedComponents/Templates/PreviewStage/PreviewStage';
import { Link } from 'react-router-dom';

const { Title } = Typography;

interface CanvasStarterListItemProps {
  canvasStarter: CanvasStarterData;
}

const CanvasStarterListItem = ({ canvasStarter }: CanvasStarterListItemProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Title level={4} style={{ color: 'gray' }}>
        {canvasStarter.name}
      </Title>
      <Link to={`/create-template?canvasStarterName=${canvasStarter.name}`}>
        <PreviewStage canvasDesign={canvasStarter.canvasDesign} scale={0.33} showInputFillColor={true}/>
      </Link>
    </div>
  );
};

export default CanvasStarterListItem;
