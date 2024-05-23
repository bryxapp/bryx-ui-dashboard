import { Group, Rect, Text } from "react-konva";
import { EmailInputObj } from "../../../../../utils/types/CanvasInterfaces";
import { FILL_COLOR, getInputXAlignment } from "../../../../Templates/CanvasItem/Shapes/Inputs/Input/InputHelper";
import { EstimateFormFields } from "../../../../../utils/types/EstimateInterfaces";

interface PreviewEmailInputProps {
    EmailInputObj: EmailInputObj;
    showInputFillColor: boolean;
    formInputs?: EstimateFormFields;
}

const PreviewEmailInput = ({ EmailInputObj, formInputs, showInputFillColor }: PreviewEmailInputProps) => {
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
            {showInputFillColor && (
                <Rect
                    width={EmailInputObj.width}
                    height={EmailInputObj.height}
                    fill={FILL_COLOR}
                />
            )}
            <Text
                x={getInputXAlignment(EmailInputObj)}
                y={0}
                text={value}
                fontSize={EmailInputObj.fontSize}
                fontFamily={EmailInputObj.fontFamily}
                fontStyle={EmailInputObj.fontStyle}
                textDecoration={EmailInputObj.textDecoration}
                fill={EmailInputObj.fill}
                align={EmailInputObj.horizontalAlign}
            />
        </Group>
    );
};

export default PreviewEmailInput;
