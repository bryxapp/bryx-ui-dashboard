import { Rect, Text } from 'react-konva';
import { FILL_COLOR, getInputXAlignment, getInputYAlignment } from './InputHelper'
import { InputContentObj } from '../../../../../../utils/types/CanvasInterfaces';

interface InputContentProps {
    textObj: InputContentObj;
    verticalAlign?: string;
    contentHeight: number;
    contentWidth: number;
    labelHeight: number;
    containerWidth: number;
    labelFontSize: number;
    onSelect: any;
}

const InputContent = ({ textObj, contentHeight, contentWidth, labelHeight, labelFontSize, onSelect, verticalAlign }: InputContentProps) => {
    const yalign = verticalAlign ? getInputYAlignment(textObj, textObj.placeHolder, contentHeight, verticalAlign) : 0;
    return (
        <>
            <Rect
                x={0}
                y={labelHeight + (labelFontSize / 10)}
                width={textObj.width}
                height={textObj.height}
                fill={FILL_COLOR}
                onClick={onSelect}
                onTap={onSelect}
            />
            <Text
                x={getInputXAlignment(textObj,textObj.placeHolder, textObj.width)}
                y={yalign + labelHeight + (labelFontSize / 10)}
                text={`${textObj.placeHolder}`}
                fontSize={textObj.fontSize}
                fill={textObj.fill}
                fontFamily={textObj.fontFamily}
                fontStyle={textObj.fontStyle}
                textDecoration={textObj.textDecoration}
                scaleX={1}
                scaleY={1}
            />
        </>

    );
};

export default InputContent;