import { Group, Rect, Text } from "react-konva";
import { PhoneInputObj } from "../../../../../utils/types/CanvasInterfaces";
import { FILL_COLOR, getInputXAlignment } from "../../../../Templates/CanvasItem/Shapes/Inputs/Input/InputHelper";
import { EstimateFormFields } from "../../../../../utils/types/EstimateInterfaces";

interface PreviewPhoneInputProps {
    PhoneInputObj: PhoneInputObj;
    showInputFillColor: boolean;
    formInputs?: EstimateFormFields;
}

const PreviewPhoneInput = ({ PhoneInputObj, formInputs, showInputFillColor }: PreviewPhoneInputProps) => {
    const value = formInputs ? formInputs[PhoneInputObj.id].value : '';
    PhoneInputObj.value = value;
    return (
        <Group
            key={PhoneInputObj.id}
            id={PhoneInputObj.id}
            x={PhoneInputObj.x}
            y={PhoneInputObj.y}
            rotation={PhoneInputObj.rotation}
        >
            {showInputFillColor && (
                <Rect
                    width={PhoneInputObj.width}
                    height={PhoneInputObj.height}
                    fill={FILL_COLOR}
                />
            )}
            <Text
                x={getInputXAlignment(PhoneInputObj)}
                y={0}
                text={value}
                fontSize={PhoneInputObj.fontSize}
                fontFamily={PhoneInputObj.fontFamily}
                fill={PhoneInputObj.fill}
                align={PhoneInputObj.horizontalAlign}
            />
        </Group>
    );
};

export default PreviewPhoneInput;
