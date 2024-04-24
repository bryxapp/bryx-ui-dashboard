import { Rect } from "react-konva";
import { RectangleObj } from "../../../../../utils/types/CanvasInterfaces";

interface PreviewRoundedRectangleProps {
    roundedRectangleObj: RectangleObj;
}

const PreviewRoundedRectangle = ({ roundedRectangleObj }: PreviewRoundedRectangleProps) => {
    return (
        <Rect
            key={roundedRectangleObj.id}
            id={roundedRectangleObj.id}
            x={roundedRectangleObj.x}
            y={roundedRectangleObj.y}
            width={roundedRectangleObj.width}
            height={roundedRectangleObj.height}
            fill={roundedRectangleObj.fill}
            stroke={roundedRectangleObj.stroke}
            strokeWidth={roundedRectangleObj.strokeWidth}
            rotation={roundedRectangleObj.rotation}
            cornerRadius={roundedRectangleObj.cornerRadius}
        />
    );
};

export default PreviewRoundedRectangle;
