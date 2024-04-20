import { Rect, Text } from 'react-konva';
import { FILL_COLOR, getXAlignment, getYAlignment } from './InputHelper'
import { InputContentShape, TextValueObj } from '../../../../../../utils/types/CanvasInterfaces';

interface InputContentProps {
    textObj: TextValueObj;
    inputContentShape?: InputContentShape;
    verticalAlign?: string;
    contentHeight: number;
    contentWidth: number;
    labelHeight: number;
    containerWidth: number;
    labelFontSize: number;
    onSelect: any;
}

const InputContent = ({ textObj, contentHeight, contentWidth, labelHeight, labelFontSize, onSelect, inputContentShape, verticalAlign }: InputContentProps) => {
    const rectangleWidth = inputContentShape ? inputContentShape.width : contentWidth;
    const rectangleHeight = inputContentShape ? inputContentShape.height : contentHeight;
    const yalign = verticalAlign ? getYAlignment(textObj, contentHeight, verticalAlign) : 0;
    return (
        <>
            <Rect
                x={0}
                y={labelHeight + (labelFontSize / 10)}
                width={rectangleWidth}
                height={rectangleHeight}
                fill={FILL_COLOR}
                onClick={onSelect}
                onTap={onSelect}
            />
            <Text
                x={getXAlignment(textObj, rectangleWidth)}
                y={yalign + labelHeight + (labelFontSize / 10)}
                text={`${textObj.value}`}
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