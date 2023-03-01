import { Circle } from 'react-konva';

const CircleShape = ({ circleObj, handleDragStart, handleDragEnd }: any) => {
    console.log(circleObj)
    return (
        <Circle
            id={circleObj.id}
            x={circleObj.x}
            y={circleObj.y}
            radius={circleObj.radius}
            fill={circleObj.fill}
            scaleX={circleObj.isDragging ? 1.2 : 1}
            scaleY={circleObj.isDragging ? 1.2 : 1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            draggable
        />
    )
};

export default CircleShape;