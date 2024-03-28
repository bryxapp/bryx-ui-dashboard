import { Text } from 'react-konva';
import { TextBase } from '../../../../../utils/types/CanvasInterfaces';

interface InputLabelProps {
    labelObj: TextBase;
    x: any;
    y: any;
}

const InputLabel = ({ labelObj, x, y }: InputLabelProps) => {
    return (
        <Text
            x={x}
            y={y}
            text={labelObj.value}
            fontSize={labelObj.fontSize}
            fill={labelObj.fill}
            fontFamily={labelObj.fontFamily}
            fontStyle={labelObj.fontStyle}
            scaleX={1}
            scaleY={1} />
    );
};

export default InputLabel;