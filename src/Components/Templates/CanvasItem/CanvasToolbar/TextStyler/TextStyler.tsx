import * as React from 'react';
import DisplayNameEditor from './DisplayNameEditor'
import FontSizePicker from './FontSizePicker'
import FontFamilyPicker from './FontFamilyPicker'
import FontStylePicker from './FontStylePicker'
import FontDecorationPicker from './FontDecorationPicker'
import { CanvasDesignData } from '../../../../../utils/types/CanvasInterfaces';
import InputFormatPicker from './InputFormatPicker';
import AlignmentPicker from './AlignmentPicker';

interface TextStylerProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<CanvasDesignData>;
}

function TextStyler({ canvasDesign, setCanvasDesign }: TextStylerProps) {
    return (
        <>
                <DisplayNameEditor canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign}/>
                <InputFormatPicker canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                <FontFamilyPicker canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                <FontSizePicker canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <FontStylePicker canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                    <FontDecorationPicker canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                </div>
                <AlignmentPicker canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
        </>
    );
}

export default TextStyler;
