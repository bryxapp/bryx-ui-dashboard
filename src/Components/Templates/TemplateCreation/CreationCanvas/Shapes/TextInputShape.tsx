import { Rect, Text, Group } from 'react-konva';
import { styled } from '@mui/material/styles';

const TextInputContainer = styled(Rect)({
    borderRadius: '4px',
    border: '1px solid #C4C4C4',
    padding: '12px'
});

const TextInput = ({ shape, handleDragStart, handleDragEnd }: any) => {
    return (
        <Group
            key={shape.id}
            id={shape.id}
            x={shape.x}
            y={shape.y}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <TextInputContainer
                width={180}
                height={40}
                fill="#F5F5F5"
                scaleX={shape.isDragging ? 1.2 : 1}
                scaleY={shape.isDragging ? 1.2 : 1}
            />
            <Text
                x={5}
                y={5}
                text={`Form Input ${shape.id}`}
                fontSize={12}
                fill="#333"
                scaleX={shape.isDragging ? 1.2 : 1}
                scaleY={shape.isDragging ? 1.2 : 1}
            />
        </Group>
    );
};

export default TextInput;