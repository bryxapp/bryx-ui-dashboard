import { Line } from 'react-konva';

const LineShape = ({ lineObj, handleDragStart, handleDragEnd }: any) => {
    return (
        <Line
            id={lineObj.id}
            points={lineObj.points}
            stroke={lineObj.stroke}
            strokeWidth={lineObj.strokeWidth}
            scaleX={1}
            scaleY={1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            draggable
        />
    )
};

export default LineShape;