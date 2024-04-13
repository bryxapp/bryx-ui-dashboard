import { Rect, Text } from 'react-konva';
import { FILL_COLOR, getXAlignment, getYAlignment } from './InputHelper'
import { TextBase } from '../../../../../../utils/types/CanvasInterfaces';

interface InputContentProps {
    textObj: TextBase;
    contentHeight: number;
    contentWidth: number;
    labelHeight: number;
    containerWidth: number;
    labelFontSize: number;
    onSelect: any;
}

const InputContent = ({ textObj, contentHeight, contentWidth, labelHeight, containerWidth, labelFontSize, onSelect }: InputContentProps) => {

    return (
        <>
            <Rect
                x={0}
                y={getYAlignment(contentHeight) + labelHeight + (labelFontSize/10)}
                width={contentWidth}
                height={contentHeight}
                fill={FILL_COLOR}
                onClick={onSelect}
                onTap={onSelect}
            />
            <Text
                x={getXAlignment(textObj, containerWidth)}
                y={getYAlignment(contentHeight) + labelHeight + (labelFontSize/10)}
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