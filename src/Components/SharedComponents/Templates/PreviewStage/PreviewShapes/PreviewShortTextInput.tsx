import { Group, Text } from "react-konva";
import { ShortTextInputObj } from "../../../../../utils/types/CanvasInterfaces";
import { getInputXAlignment } from "../../../../Templates/CanvasItem/Shapes/Inputs/Input/InputHelper";
import { EstimateFormFields } from "../../../../../utils/types/EstimateInterfaces";

interface PreviewShortTextInputProps {
    ShortTextInputObj: ShortTextInputObj;
    formInputs?: EstimateFormFields;
}

const PreviewShortTextInput = ({ ShortTextInputObj, formInputs }: PreviewShortTextInputProps) => {
    const value = formInputs ? formInputs[ShortTextInputObj.id].value : '';
    ShortTextInputObj.value = value;

    return (
        <Group
            key={ShortTextInputObj.id}
            id={ShortTextInputObj.id}
            x={ShortTextInputObj.x}
            y={ShortTextInputObj.y}
            rotation={ShortTextInputObj.rotation}
        >
            <Text
                x={getInputXAlignment(ShortTextInputObj)}
                y={0}
                text={value}
                fontSize={ShortTextInputObj.fontSize}
                fontFamily={ShortTextInputObj.fontFamily}
                fontStyle={ShortTextInputObj.fontStyle}
                textDecoration={ShortTextInputObj.textDecoration}
                fill={ShortTextInputObj.fill}
                align={ShortTextInputObj.horizontalAlign}
            />
        </Group>
    );
};

export default PreviewShortTextInput;
