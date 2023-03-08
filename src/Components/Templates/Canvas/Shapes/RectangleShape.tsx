import { Rect } from 'react-konva';

const RectangleShape = ({ rectangleObj, handleDragStart, handleDragEnd }: any) => {
    return (
        <Rect
            id={rectangleObj.id}
            x={rectangleObj.x}
            y={rectangleObj.y}
            width={rectangleObj.width}
            height={rectangleObj.height}
            fill={rectangleObj.fill}
            scaleX={rectangleObj.isDragging ? 1.1 : 1}
            scaleY={rectangleObj.isDragging ? 1.1 : 1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            draggable
        />
    )
};

export default RectangleShape;