import { Group, Text } from "react-konva";
import { ShortTextInputObj } from "../../../../../utils/types/CanvasInterfaces";
import { getTextWidthAndHeight } from "../../../../../utils/shapeManagementUtils";
import { getXAlignment } from "../../../../Templates/CanvasItem/Shapes/Inputs/SharedInputComponents/InputHelper";
import { EstimateFormFields } from "../../../../../utils/types/EstimateInterfaces";

interface PreviewShortTextInputProps {
    ShortTextInputObj: ShortTextInputObj;
    formInputs?: EstimateFormFields;
}

const PreviewShortTextInput = ({ ShortTextInputObj, formInputs }: PreviewShortTextInputProps) => {
    const value = formInputs ? formInputs[ShortTextInputObj.id].value : '';
    ShortTextInputObj.content.value = value;
    const [labelShapeWidth, labelShapeHeight] = getTextWidthAndHeight(ShortTextInputObj.label, ShortTextInputObj.label.value);
    const [contentShapeWidth,] = getTextWidthAndHeight(ShortTextInputObj.content, ShortTextInputObj.content.value);
    const containerWidth = Math.max(labelShapeWidth, contentShapeWidth, ShortTextInputObj.inputContentShape.width)

    return (
        <Group
            key={ShortTextInputObj.id}
            id={ShortTextInputObj.id}
            x={ShortTextInputObj.x}
            y={ShortTextInputObj.y}
            rotation={ShortTextInputObj.rotation}
        >
            {ShortTextInputObj.hasLabel &&
                <Text
                    x={getXAlignment(ShortTextInputObj.label, containerWidth)}
                    y={0}
                    text={ShortTextInputObj.label.value}
                    fontSize={ShortTextInputObj.label.fontSize}
                    fontFamily={ShortTextInputObj.label.fontFamily}
                    fill={ShortTextInputObj.label.fill}
                    align={ShortTextInputObj.label.horizontalAlign}
                />
            }
            <Text
                x={getXAlignment(ShortTextInputObj.content, containerWidth)}
                y={labelShapeHeight + (ShortTextInputObj.label.fontSize / 10)}
                text={value}
                fontSize={ShortTextInputObj.content.fontSize}
                fontFamily={ShortTextInputObj.content.fontFamily}
                fill={ShortTextInputObj.content.fill}
                align={ShortTextInputObj.content.horizontalAlign}
            />
        </Group>
    );
};

export default PreviewShortTextInput;
