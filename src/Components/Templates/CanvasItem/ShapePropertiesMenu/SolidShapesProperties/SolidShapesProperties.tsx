import { Card } from 'antd';
import BorderColorPicker from './ColorPicker/BorderColorPicker';
import { SolidShapeObj } from '../../../../../utils/types/CanvasInterfaces';
import FillColorPicker from './ColorPicker/FillColorPicker';

interface SolidShapesPropertiesProps {
    solidShapeObj: SolidShapeObj;
}


const SolidShapesProperties = ({ solidShapeObj }: SolidShapesPropertiesProps) => {
    return (
        <Card >
            <FillColorPicker solidShapeObj={solidShapeObj} />
            <BorderColorPicker solidShapeObj={solidShapeObj} />
        </Card>
    );
};

export default SolidShapesProperties;

