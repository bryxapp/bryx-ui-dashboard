import { Group, Text } from "react-konva";
import { EmailInputObj } from "../../../../../utils/types/CanvasInterfaces";
import { getTextWidthAndHeight } from "../../../../../utils/shapeManagementUtils";
import { getInputXAlignment } from "../../../../Templates/CanvasItem/Shapes/Inputs/SharedInputComponents/InputHelper";
import { EstimateFormFields } from "../../../../../utils/types/EstimateInterfaces";

interface PreviewEmailInputProps {
    EmailInputObj: EmailInputObj;
    formInputs?: EstimateFormFields;
}

const PreviewEmailInput = ({ EmailInputObj, formInputs }: PreviewEmailInputProps) => {
    const value = formInputs ? formInputs[EmailInputObj.id].value : '';
    EmailInputObj.value = value;
    const [contentShapeWidth,] = getTextWidthAndHeight(EmailInputObj);
    const containerWidth = Math.max(EmailInputObj.width, contentShapeWidth);
    return (
        <Group
            key={EmailInputObj.id}
            id={EmailInputObj.id}
            x={EmailInputObj.x}
            y={EmailInputObj.y}
            rotation={EmailInputObj.rotation}
        >
            <Text
                x={getInputXAlignment(EmailInputObj, containerWidth)}
                y={0}
                text={value}
                fontSize={EmailInputObj.fontSize}
                fontFamily={EmailInputObj.fontFamily}
                fill={EmailInputObj.fill}
                align={EmailInputObj.horizontalAlign}
            />
        </Group>
    );
};

export default PreviewEmailInput;
