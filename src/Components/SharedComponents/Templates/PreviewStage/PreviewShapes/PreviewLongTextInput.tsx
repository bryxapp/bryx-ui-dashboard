import { Group, Text } from "react-konva";
import { LongTextInputObj } from "../../../../../utils/types/CanvasInterfaces";
import { getTextWidthAndHeight } from "../../../../../utils/shapeManagementUtils";
import { getInputXAlignment, getInputYAlignment, getTextXAlignment } from "../../../../Templates/CanvasItem/Shapes/Inputs/SharedInputComponents/InputHelper";
import { EstimateFormFields } from "../../../../../utils/types/EstimateInterfaces";

interface PreviewLongTextInputProps {
    LongTextInputObj: LongTextInputObj;
    formInputs?: EstimateFormFields;
}

const PreviewLongTextInput = ({ LongTextInputObj, formInputs }: PreviewLongTextInputProps) => {
    const value = formInputs ? formInputs[LongTextInputObj.id].value : '';
    LongTextInputObj.content.value = value;
    const [labelShapeWidth, labelShapeHeight] = getTextWidthAndHeight(LongTextInputObj.label,LongTextInputObj.label.value);
    const [contentShapeWidth, contentShapeHeight] = getTextWidthAndHeight(LongTextInputObj.content, LongTextInputObj.content.value);
    const containerWidth = Math.max(labelShapeWidth, contentShapeWidth, LongTextInputObj.inputWidth)
    const containerHeight = Math.max(labelShapeHeight, contentShapeHeight, LongTextInputObj.inputHeight);
    const yalign = getInputYAlignment(LongTextInputObj.content, value, containerHeight, LongTextInputObj.verticalAlign);

    return (
        <Group
            key={LongTextInputObj.id}
            id={LongTextInputObj.id}
            x={LongTextInputObj.x}
            y={LongTextInputObj.y}
            rotation={LongTextInputObj.rotation}
        >
            {LongTextInputObj.hasLabel &&
                <Text
                    x={getTextXAlignment(LongTextInputObj.label, containerWidth, LongTextInputObj.label.horizontalAlign)}
                    y={0}
                    text={LongTextInputObj.label.value}
                    fontSize={LongTextInputObj.label.fontSize}
                    fontFamily={LongTextInputObj.label.fontFamily}
                    fill={LongTextInputObj.label.fill}
                    align={LongTextInputObj.label.horizontalAlign}
                />
            }
            <Text
                x={getInputXAlignment(LongTextInputObj.content, value, containerWidth)}
                y={yalign + labelShapeHeight + (LongTextInputObj.label.fontSize / 10)}
                text={value}
                fontSize={LongTextInputObj.content.fontSize}
                fontFamily={LongTextInputObj.content.fontFamily}
                fill={LongTextInputObj.content.fill}
                align={LongTextInputObj.content.horizontalAlign}
            />
        </Group>
    );
};

export default PreviewLongTextInput;
