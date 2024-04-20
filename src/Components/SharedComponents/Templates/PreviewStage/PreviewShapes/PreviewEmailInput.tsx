import { Group, Text } from "react-konva";
import { EmailInputObj } from "../../../../../utils/types/CanvasInterfaces";
import { getTextWidthAndHeight } from "../../../../../utils/shapeManagementUtils";
import { getInputXAlignment, getTextXAlignment } from "../../../../Templates/CanvasItem/Shapes/Inputs/SharedInputComponents/InputHelper";
import { EstimateFormFields } from "../../../../../utils/types/EstimateInterfaces";

interface PreviewEmailInputProps {
    EmailInputObj: EmailInputObj;
    formInputs?: EstimateFormFields;
}

const PreviewEmailInput = ({ EmailInputObj, formInputs }: PreviewEmailInputProps) => {
    const value = formInputs ? formInputs[EmailInputObj.id].value : '';
    EmailInputObj.content.placeHolder = value;
    const [labelShapeWidth, labelShapeHeight] = getTextWidthAndHeight(EmailInputObj.label, EmailInputObj.label.value);
    const [contentShapeWidth,] = getTextWidthAndHeight(EmailInputObj.content, EmailInputObj.content.placeHolder);
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
                    x={getTextXAlignment(EmailInputObj.label, containerWidth)}
                    y={0}
                    text={EmailInputObj.label.value}
                    fontSize={EmailInputObj.label.fontSize}
                    fontFamily={EmailInputObj.label.fontFamily}
                    fill={EmailInputObj.label.fill}
                    align={EmailInputObj.label.horizontalAlign}
                />
            }
            <Text
                x={getInputXAlignment(EmailInputObj.content, value, containerWidth)}
                y={EmailInputObj.hasLabel ? labelShapeHeight + (EmailInputObj.label.fontSize / 10) : 0}
                text={value}
                fontSize={EmailInputObj.content.fontSize}
                fontFamily={EmailInputObj.content.fontFamily}
                fill={EmailInputObj.content.fill}
                align={EmailInputObj.content.horizontalAlign}
            />
        </Group>
    );
};

export default PreviewEmailInput;
