import CanvasListItem from "./CanvasStarterListItem/CanvasStarterListItem";
import { CanvasStarterData } from '../../../../utils/types/CanvasInterfaces';
import { CanvasStarters } from '../../../../utils/canvas-starters';
import { Col, Row } from 'antd';

const CanvasStarterList = () => {
    const canvasStarters: CanvasStarterData[] = CanvasStarters;
    return (
        <Row gutter={[16, 16]}>
            {canvasStarters.map(canvasStarter => (
            <Col xs={24} sm={12} md={8} key={canvasStarter.name}>
                <CanvasListItem canvasStarter={canvasStarter} />
            </Col>
        ))}
        </Row>
    );
}

export default CanvasStarterList;
