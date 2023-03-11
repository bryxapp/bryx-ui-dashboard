import { Rect, Text, Group } from 'react-konva';
import { styled } from '@mui/material/styles';

const TextInputContainer = styled(Rect)({
    borderRadius: '4px',
    border: '1px solid #C4C4C4',
    padding: '12px'
});

const TextInput = ({ textInputObj, handleDragStart, handleDragEnd }: any) => {
    return (
        <Group
            key={textInputObj.id}
            id={textInputObj.id}
            displayName = {textInputObj.displayName}
            x={textInputObj.x}
            y={textInputObj.y}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <TextInputContainer
                width={textInputObj.width}
                height={textInputObj.height}
                fill={textInputObj.fill}
                scaleX={textInputObj.isDragging ? 1.1 : 1}
                scaleY={textInputObj.isDragging ? 1.1 : 1}
            />
            <Text
                x={5}
                y={5}
                text={`${textInputObj.displayName}`}
                fontSize={12}
                fill="#333"
                scaleX={textInputObj.isDragging ? 1.1 : 1}
                scaleY={textInputObj.isDragging ? 1.1 : 1}
            />
        </Group>
    );
};

export default TextInput;