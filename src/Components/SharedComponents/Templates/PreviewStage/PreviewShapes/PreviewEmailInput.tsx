import { Group, Text } from "react-konva";
import { EmailInputObj } from "../../../../../utils/types/CanvasInterfaces";
import { getTextWidthAndHeight } from "../../../../../utils/shapeManagementUtils";
import { getXAlignment } from "../../../../Templates/CanvasItem/Shapes/Inputs/SharedInputComponents/InputHelper";
import { EstimateFormFields } from "../../../../../utils/types/EstimateInterfaces";

interface PreviewEmailInputProps {
    EmailInputObj: EmailInputObj;
    formInputs?: EstimateFormFields;
}

const PreviewEmailInput = ({ EmailInputObj, formInputs }: PreviewEmailInputProps) => {
    const value = formInputs ? formInputs[EmailInputObj.id].value : '';
    EmailInputObj.content.value = value;
    const [labelShapeWidth, labelShapeHeight] = getTextWidthAndHeight(EmailInputObj.label);
    const [contentShapeWidth,] = getTextWidthAndHeight(EmailInputObj.content);
    //Container Measurements 
    const containerWidth = Math.max(labelShapeWidth, contentShapeWidth);
    return (
        <Group
            key={EmailInputObj.id}
            id={EmailInputObj.id}
            x={EmailInputObj.x}
            y={EmailInputObj.y}
            rotation={EmailInputObj.rotation}
        >
            {EmailInputObj.hasLabel &&
                <Text
                    x={getXAlignment(EmailInputObj.label, containerWidth)}
                    y={0}
                    text={EmailInputObj.label.value}
                    fontSize={EmailInputObj.label.fontSize}
                    fontFamily={EmailInputObj.label.fontFamily}
                    fill={EmailInputObj.label.fill}
                    align={EmailInputObj.label.align}
                />
            }
            <Text
                x={getXAlignment(EmailInputObj.content, containerWidth)}
                y={EmailInputObj.hasLabel ? labelShapeHeight + (EmailInputObj.label.fontSize / 10) : 0}
                text={value}
                fontSize={EmailInputObj.content.fontSize}
                fontFamily={EmailInputObj.content.fontFamily}
                fill={EmailInputObj.content.fill}
                align={EmailInputObj.content.align}
            />
        </Group>
    );
};

export default PreviewEmailInput;
