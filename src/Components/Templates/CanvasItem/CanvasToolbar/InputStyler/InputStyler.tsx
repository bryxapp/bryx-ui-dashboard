import { CanvasDesignData, InputObj } from '../../../../../utils/types/CanvasInterfaces';
import { AppBar } from '@mui/material';
import { findShape, isInputObject } from '../../../../../utils/shapeManagementUtils';
import LabelEditor from './LabelEditor';
import ContentEditor from './ContentEditor';

interface InputStylerProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<CanvasDesignData>;
}

function InputStyler({ canvasDesign, setCanvasDesign }: InputStylerProps) {
    const shape = findShape(canvasDesign, canvasDesign.selectedId);
    const isinputObject = isInputObject(shape);
    if (!isinputObject) return null;

    return (
        <AppBar position="static" color='secondary' style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', paddingLeft: "1rem" }}>
            <LabelEditor inputObj={shape as InputObj} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
            <ContentEditor inputObj={shape as InputObj} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
        </AppBar>
    );
}

export default InputStyler;
