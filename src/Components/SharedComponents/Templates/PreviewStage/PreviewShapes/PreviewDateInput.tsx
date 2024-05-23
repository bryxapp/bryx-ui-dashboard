import { Group, Rect, Text } from "react-konva";
import { DateInputObj } from "../../../../../utils/types/CanvasInterfaces";
import { FILL_COLOR, getInputXAlignment } from "../../../../Templates/CanvasItem/Shapes/Inputs/Input/InputHelper";
import { EstimateFormFields } from "../../../../../utils/types/EstimateInterfaces";
import { format } from "date-fns";

interface PreviewDateInputProps {
    DateInputObj: DateInputObj;
    formInputs?: EstimateFormFields;
    showInputFillColor: boolean;
}

const PreviewDateInput = ({ DateInputObj, formInputs, showInputFillColor }: PreviewDateInputProps) => {
    const dateString = formInputs ? formInputs[DateInputObj.id].value : '';
    const val = dateString ? format(new Date(dateString), DateInputObj.dateFormat) : '';
    DateInputObj.value = val;
    return (
        <Group
            key={DateInputObj.id}
            id={DateInputObj.id}
            x={DateInputObj.x}
            y={DateInputObj.y}
            rotation={DateInputObj.rotation}
        >
            {showInputFillColor && (
                <Rect
                    width={DateInputObj.width}
                    height={DateInputObj.height}
                    fill={FILL_COLOR}
                />
            )}
            <Text
                x={getInputXAlignment(DateInputObj)}
                y={0}
                text={val}
                fontSize={DateInputObj.fontSize}
                fontFamily={DateInputObj.fontFamily}
                fontStyle={DateInputObj.fontStyle}
                textDecoration={DateInputObj.textDecoration}
                fill={DateInputObj.fill}
                align={DateInputObj.horizontalAlign}
            />
        </Group>
    );
};

export default PreviewDateInput;
