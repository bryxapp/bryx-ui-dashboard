import { Text } from "react-konva";
import { ParagraphObj } from "../../../../../utils/types/CanvasInterfaces";

interface PreviewParagraphProps {
    ParagraphObj: ParagraphObj;
}

const PreviewParagraph= ({ ParagraphObj }: PreviewParagraphProps) => {
    return (
        <Text
            key={ParagraphObj.id}
            id={ParagraphObj.id}
            x={ParagraphObj.x}
            y={ParagraphObj.y}
            text={ParagraphObj.textValue}
            fontSize={ParagraphObj.fontSize}
            fontFamily={ParagraphObj.fontFamily}
            fontStyle={ParagraphObj.fontStyle}
            textDecoration={ParagraphObj.textDecoration}
            fill={ParagraphObj.fill}
            rotation={ParagraphObj.rotation}
            align={ParagraphObj.horizontalAlign}
        />
    );
};

export default PreviewParagraph;
