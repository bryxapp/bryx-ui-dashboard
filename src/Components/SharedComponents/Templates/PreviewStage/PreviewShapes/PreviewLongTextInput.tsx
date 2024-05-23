import { Group, Rect, Text } from "react-konva";
import { LongTextInputObj } from "../../../../../utils/types/CanvasInterfaces";
import { FILL_COLOR, getInputXAlignment, getInputYAlignment } from "../../../../Templates/CanvasItem/Shapes/Inputs/Input/InputHelper";
import { EstimateFormFields } from "../../../../../utils/types/EstimateInterfaces";

interface PreviewLongTextInputProps {
    LongTextInputObj: LongTextInputObj;
    showInputFillColor: boolean;
    formInputs?: EstimateFormFields;
}

const PreviewLongTextInput = ({ LongTextInputObj, formInputs, showInputFillColor }: PreviewLongTextInputProps) => {
    const value = formInputs ? formInputs[LongTextInputObj.id]?.value : '';
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
            {showInputFillColor && (
                <Rect
                    width={LongTextInputObj.width}
                    height={LongTextInputObj.height}
                    fill={FILL_COLOR}
                />
            )}
            <Text
                x={getInputXAlignment(LongTextInputObj)}
                y={yalign}
                text={value}
                fontSize={LongTextInputObj.fontSize}
                fontFamily={LongTextInputObj.fontFamily}
                fontStyle={LongTextInputObj.fontStyle}
                textDecoration={LongTextInputObj.textDecoration}
                fill={LongTextInputObj.fill}
                align={LongTextInputObj.horizontalAlign}
            />
        </Group>
    );
};

export default PreviewLongTextInput;
