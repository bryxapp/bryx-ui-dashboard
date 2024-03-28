import { CanvasDesignData } from '../../../../../utils/types/CanvasInterfaces';
import FontSizePicker from './FontSizePicker'
import FontFamilyPicker from './FontFamilyPicker'
import FontStylePicker from './FontStylePicker'
import FontDecorationPicker from './FontDecorationPicker'
import TextAlignmentPicker from './TextAlignmentPicker';
import { AppBar } from '@mui/material';
import { findShape, isTextObject } from '../../../../../utils/shapeManagementUtils';

interface TextStylerProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<CanvasDesignData>;
}

function TextStyler({ canvasDesign, setCanvasDesign }: TextStylerProps) {
    if (!isTextObject(findShape(canvasDesign, canvasDesign.selectedId))) return null;

    return (
        <AppBar position="static" color='secondary' style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', paddingLeft: "1rem" }}>
            <FontFamilyPicker canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
            <FontSizePicker canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
            <FontStylePicker canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
            <FontDecorationPicker canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
            <TextAlignmentPicker canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
        </AppBar>
    );
}

export default TextStyler;
