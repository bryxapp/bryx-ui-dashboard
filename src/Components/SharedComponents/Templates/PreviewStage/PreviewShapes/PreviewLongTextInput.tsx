import { Group, Text } from "react-konva";
import { LongTextInputObj } from "../../../../../utils/types/CanvasInterfaces";
import { getInputXAlignment, getInputYAlignment } from "../../../../Templates/CanvasItem/Shapes/Inputs/Input/InputHelper";
import { EstimateFormFields } from "../../../../../utils/types/EstimateInterfaces";

interface PreviewLongTextInputProps {
    LongTextInputObj: LongTextInputObj;
    formInputs?: EstimateFormFields;
}

const PreviewLongTextInput = ({ LongTextInputObj, formInputs }: PreviewLongTextInputProps) => {
    const value = formInputs ? formInputs[LongTextInputObj.id].value : '';
    LongTextInputObj.value = value;
    const yalign = getInputYAlignment(LongTextInputObj, LongTextInputObj.verticalAlign);

    return (
        <Group
            key={LongTextInputObj.id}
            id={LongTextInputObj.id}
            x={LongTextInputObj.x}
            y={LongTextInputObj.y}
            rotation={LongTextInputObj.rotation}
        >
            <Text
                x={getInputXAlignment(LongTextInputObj)}
                y={yalign}
                text={value}
                fontSize={LongTextInputObj.fontSize}
                fontFamily={LongTextInputObj.fontFamily}
                fill={LongTextInputObj.fill}
                align={LongTextInputObj.horizontalAlign}
            />
        </Group>
    );
};

export default PreviewLongTextInput;
