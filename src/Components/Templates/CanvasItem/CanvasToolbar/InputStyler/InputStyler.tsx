import { InputObj } from '../../../../../utils/types/CanvasInterfaces';
import { findShape, isInputObject } from '../../../../../utils/shapeManagementUtils';
import LabelEditor from './LabelEditor';
import ContentEditor from './ContentEditor';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { Header } from 'antd/es/layout/layout';

function InputStyler() {
    const { selectedId, canvasDesign } = useCanvasDesignContext();
    const shape = findShape(canvasDesign, selectedId);
    const isinputObject = isInputObject(shape);
    if (!isinputObject) return null;

    return (
        <Header>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', paddingLeft: "1rem" }}>
            <LabelEditor inputObj={shape as InputObj} />
            <ContentEditor inputObj={shape as InputObj} />
        </div>
        </Header>
    );
}

export default InputStyler;
