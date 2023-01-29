import { Rect } from 'react-konva';

const RectangleShape = ({ shape, handleDragStart, handleDragEnd }: any) => {
    return (
        <Rect
            id={shape.id}
            x={shape.x}
            y={shape.y}
            width={200}
            height={50}
            fill="lightgray"
            opacity={0.8}
            draggable
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            shadowOffsetX={shape.isDragging ? 10 : 5}
            shadowOffsetY={shape.isDragging ? 10 : 5}
            scaleX={shape.isDragging ? 1.2 : 1}
            scaleY={shape.isDragging ? 1.2 : 1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        />
    )
};

export default RectangleShape;