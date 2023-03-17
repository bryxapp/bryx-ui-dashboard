import { Rect, Text, Group } from 'react-konva';
import { styled } from '@mui/material/styles';
import { textInputObj } from '../../../../Utils/types/ShapeInterfaces';

const TextInputContainer = styled(Rect)({
    borderRadius: '4px',
    border: '1px solid #C4C4C4',
    padding: '12px'
});

interface TextInputProps {
    textInputObj: textInputObj;
    handleDragStart: any;
    handleDragEnd: any;
}

const TextInput = ({ textInputObj, handleDragStart, handleDragEnd }: TextInputProps) => {
    return (
        <Group
            key={textInputObj.id}
            id={textInputObj.id}
            displayName={textInputObj.displayName}
            x={textInputObj.x}
            y={textInputObj.y}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <TextInputContainer
                width={textInputObj.fontSize * 10}
                height={textInputObj.fontSize * 2}
                fill='#F5F5F5'
                scaleX={textInputObj.isDragging ? 1.1 : 1}
                scaleY={textInputObj.isDragging ? 1.1 : 1}
            />
            <Text
                x={5}
                y={5}
                text={`${textInputObj.displayName}`}
                fontSize={12}
                fill={textInputObj.fontColor}
                scaleX={textInputObj.isDragging ? 1.1 : 1}
                scaleY={textInputObj.isDragging ? 1.1 : 1}
            />
        </Group>
    );
};

export default TextInput;