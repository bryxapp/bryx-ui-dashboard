import { CanvasDesignData } from '../../../../../utils/types/CanvasInterfaces';
import DisplayNameEditor from './DisplayNameEditor'
import FontSizePicker from './FontSizePicker'
import FontFamilyPicker from './FontFamilyPicker'
import FontStylePicker from './FontStylePicker'
import FontDecorationPicker from './FontDecorationPicker'
import InputFormatPicker from './InputFormatPicker';
import AlignmentPicker from './AlignmentPicker';
import { AppBar } from '@mui/material';
import TextObjectSelector from './TextObjectSelector';
import { findShape, isNested, isTextObject } from '../../../../../utils/shapeManagementUtils';

interface TextStylerProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<CanvasDesignData>;
}

function TextStyler({ canvasDesign, setCanvasDesign }: TextStylerProps) {
    if (!isTextObject(findShape(canvasDesign, canvasDesign.selectedId))) return null;
    const isNestedShape = isNested(canvasDesign, canvasDesign.selectedId);

    return (
        <AppBar position="static" color='secondary' style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', paddingLeft: "1rem" }}>
            <DisplayNameEditor canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
            <InputFormatPicker canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
            <FontFamilyPicker canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
            <FontSizePicker canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
            <FontStylePicker canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
            <FontDecorationPicker canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
            <AlignmentPicker canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
            {isNestedShape && <TextObjectSelector canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />}
        </AppBar>
    );
}

export default TextStyler;
