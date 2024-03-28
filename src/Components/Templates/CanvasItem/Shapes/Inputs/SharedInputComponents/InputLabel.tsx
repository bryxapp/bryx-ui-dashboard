import { Text } from 'react-konva';
import { getXAlignment, getYAlignment } from './InputHelper';
import { TextBase } from '../../../../../../utils/types/CanvasInterfaces';

interface InputContentProps {
    textObj: TextBase;
    contentHeight: number;
    containerWidth: number;
}

const InputLabel = ({ textObj, contentHeight, containerWidth }: InputContentProps) => {

    return (
        <Text
            x={getXAlignment(textObj, containerWidth)}
            y={getYAlignment(contentHeight)}
            text={textObj.value}
            fontSize={textObj.fontSize}
            fill={textObj.fill}
            fontFamily={textObj.fontFamily}
            fontStyle={textObj.fontStyle}
            scaleX={1}
            scaleY={1} />
    );
};

export default InputLabel;