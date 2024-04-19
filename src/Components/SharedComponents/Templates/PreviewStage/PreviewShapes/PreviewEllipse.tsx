import { Ellipse } from "react-konva";
import { EllipseObj } from "../../../../../utils/types/CanvasInterfaces";

interface PreviewEllipseProps {
    EllipseObj: EllipseObj;
}

const PreviewEllipse = ({ EllipseObj }: PreviewEllipseProps) => {
    return (
        <Ellipse
            key={EllipseObj.id}
            id={EllipseObj.id}
            x={EllipseObj.x}
            y={EllipseObj.y}
            radiusX={EllipseObj.radiusX}
            radiusY={EllipseObj.radiusY}
            fill={EllipseObj.fill}
            stroke={EllipseObj.stroke}
            strokeWidth={EllipseObj.strokeWidth}
            rotation={EllipseObj.rotation}
        />
    );
};

export default PreviewEllipse;
