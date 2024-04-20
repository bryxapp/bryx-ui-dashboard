import { Group, Text } from "react-konva";
import { PhoneInputObj } from "../../../../../utils/types/CanvasInterfaces";
import { getTextWidthAndHeight } from "../../../../../utils/shapeManagementUtils";
import { getInputXAlignment, getTextXAlignment } from "../../../../Templates/CanvasItem/Shapes/Inputs/SharedInputComponents/InputHelper";
import { EstimateFormFields } from "../../../../../utils/types/EstimateInterfaces";

interface PreviewPhoneInputProps {
    PhoneInputObj: PhoneInputObj;
    formInputs?: EstimateFormFields;
}

const PreviewPhoneInput = ({ PhoneInputObj, formInputs }: PreviewPhoneInputProps) => {
    const value = formInputs ? formInputs[PhoneInputObj.id].value : '';
    PhoneInputObj.content.placeHolder = value;
    const [labelShapeWidth, labelShapeHeight] = getTextWidthAndHeight(PhoneInputObj.label, PhoneInputObj.label.value);
    const [contentShapeWidth,] = getTextWidthAndHeight(PhoneInputObj.content, PhoneInputObj.content.placeHolder);

    //Container Measurements 
    const containerWidth = Math.max(labelShapeWidth, contentShapeWidth);
    return (
        <Group
            key={PhoneInputObj.id}
            id={PhoneInputObj.id}
            x={PhoneInputObj.x}
            y={PhoneInputObj.y}
            rotation={PhoneInputObj.rotation}
        >
            {PhoneInputObj.hasLabel &&
                <Text
                    x={getTextXAlignment(PhoneInputObj.label, containerWidth)}
                    y={0}
                    text={PhoneInputObj.label.value}
                    fontSize={PhoneInputObj.label.fontSize}
                    fontFamily={PhoneInputObj.label.fontFamily}
                    fill={PhoneInputObj.label.fill}
                    align={PhoneInputObj.label.horizontalAlign}
                />
            }
            <Text
                x={getInputXAlignment(PhoneInputObj.content, value, containerWidth)}
                y={PhoneInputObj.hasLabel ? labelShapeHeight + (PhoneInputObj.label.fontSize / 10) : 0}
                text={value}
                fontSize={PhoneInputObj.content.fontSize}
                fontFamily={PhoneInputObj.content.fontFamily}
                fill={PhoneInputObj.content.fill}
                align={PhoneInputObj.content.horizontalAlign}
            />
        </Group>
    );
};

export default PreviewPhoneInput;
