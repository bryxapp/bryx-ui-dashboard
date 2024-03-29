import { InputObj } from '../../../../../utils/types/CanvasInterfaces';
import { AppBar } from '@mui/material';
import { findShape, isInputObject } from '../../../../../utils/shapeManagementUtils';
import LabelEditor from './LabelEditor';
import ContentEditor from './ContentEditor';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';

function InputStyler() {
    const { selectedId, canvasDesign } = useCanvasDesignContext();
    const shape = findShape(canvasDesign, selectedId);
    const isinputObject = isInputObject(shape);
    if (!isinputObject) return null;

    return (
        <AppBar position="static" color='secondary' style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', paddingLeft: "1rem" }}>
            <LabelEditor inputObj={shape as InputObj} />
            <ContentEditor inputObj={shape as InputObj} />
        </AppBar>
    );
}

export default InputStyler;
