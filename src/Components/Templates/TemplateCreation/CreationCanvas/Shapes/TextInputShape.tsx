import { Rect } from 'react-konva';

const TextInput = ({ shape, handleDragStart, handleDragEnd }: any) => {
    return (
        <Rect
            key={shape.id}
            id={shape.id}
            x={shape.x}
            y={shape.y}
            width={180}
            height={40}
            fill="gray"
            draggable
            scaleX={shape.isDragging ? 1.2 : 1}
            scaleY={shape.isDragging ? 1.2 : 1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        />
    )
};

export default TextInput;