import { Text } from "react-konva";
import { HeadingObj } from "../../../../../utils/types/CanvasInterfaces";

interface PreviewHeadingProps {
    HeadingObj: HeadingObj;
}

const PreviewHeading = ({ HeadingObj }: PreviewHeadingProps) => {
    return (
        <Text
            key={HeadingObj.id}
            id={HeadingObj.id}
            x={HeadingObj.x}
            y={HeadingObj.y}
            text={HeadingObj.value}
            fontSize={HeadingObj.fontSize}
            fontFamily={HeadingObj.fontFamily}
            fill={HeadingObj.fill}
            rotation={HeadingObj.rotation}
        />
    );
};

export default PreviewHeading;
