import { Group, Text } from "react-konva";
import { PhoneInputObj } from "../../../../../utils/types/CanvasInterfaces";
import { getTextWidthAndHeight } from "../../../../../utils/shapeManagementUtils";
import { getInputXAlignment } from "../../../../Templates/CanvasItem/Shapes/Inputs/SharedInputComponents/InputHelper";
import { EstimateFormFields } from "../../../../../utils/types/EstimateInterfaces";

interface PreviewPhoneInputProps {
    PhoneInputObj: PhoneInputObj;
    formInputs?: EstimateFormFields;
}

const PreviewPhoneInput = ({ PhoneInputObj, formInputs }: PreviewPhoneInputProps) => {
    const value = formInputs ? formInputs[PhoneInputObj.id].value : '';
    PhoneInputObj.value = value;
    const [contentShapeWidth,] = getTextWidthAndHeight(PhoneInputObj);
    //Container Measurements 
    const containerWidth = Math.max(PhoneInputObj.width, contentShapeWidth);
    return (
        <Group
            key={PhoneInputObj.id}
            id={PhoneInputObj.id}
            x={PhoneInputObj.x}
            y={PhoneInputObj.y}
            rotation={PhoneInputObj.rotation}
        >
            <Text
                x={getInputXAlignment(PhoneInputObj, containerWidth)}
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
