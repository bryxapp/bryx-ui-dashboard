import { Group, Text } from "react-konva";
import { EmailInputObj } from "../../../../../utils/types/CanvasInterfaces";
import { getInputXAlignment } from "../../../../Templates/CanvasItem/Shapes/Inputs/Input/InputHelper";
import { EstimateFormFields } from "../../../../../utils/types/EstimateInterfaces";

interface PreviewEmailInputProps {
    EmailInputObj: EmailInputObj;
    formInputs?: EstimateFormFields;
}

const PreviewEmailInput = ({ EmailInputObj, formInputs }: PreviewEmailInputProps) => {
    const value = formInputs ? formInputs[EmailInputObj.id].value : '';
    EmailInputObj.value = value;
    return (
        <Group
            key={EmailInputObj.id}
            id={EmailInputObj.id}
            x={EmailInputObj.x}
            y={EmailInputObj.y}
            rotation={EmailInputObj.rotation}
        >
            <Text
                x={getInputXAlignment(EmailInputObj)}
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
