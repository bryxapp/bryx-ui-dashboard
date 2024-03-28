import { CanvasDesignData } from '../../../../../utils/types/CanvasInterfaces';
import { AppBar } from '@mui/material';
import { findShape, isInputObject } from '../../../../../utils/shapeManagementUtils';
import LabelEditor from './LabelEditor';
import ContentEditor from './ContentEditor';

interface InputStylerProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<CanvasDesignData>;
}

function InputStyler({ canvasDesign, setCanvasDesign }: InputStylerProps) {
    if (!isInputObject(findShape(canvasDesign, canvasDesign.selectedId))) return null;

    return (
        <AppBar position="static" color='secondary' style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', paddingLeft: "1rem" }}>
            <LabelEditor canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
            <ContentEditor canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
        </AppBar>
    );
}

export default InputStyler;
