import { Rect } from "react-konva";
import { RectangleObj } from "../../../../../utils/types/CanvasInterfaces";

interface PreviewRectangleProps {
    rectangleObj: RectangleObj;
}

const PreviewRectangle = ({ rectangleObj }: PreviewRectangleProps) => {
    return (
        <Rect
            key={rectangleObj.id}
            id={rectangleObj.id}
            x={rectangleObj.x}
            y={rectangleObj.y}
            width={rectangleObj.width}
            height={rectangleObj.height}
            fill={rectangleObj.fill}
            stroke={rectangleObj.stroke}
            strokeWidth={rectangleObj.strokeWidth}
            rotation={rectangleObj.rotation}
        />
    );
};

export default PreviewRectangle;
