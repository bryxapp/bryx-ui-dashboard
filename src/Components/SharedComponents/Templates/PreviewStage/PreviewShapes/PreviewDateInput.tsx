import { Group, Text } from "react-konva";
import { DateInputObj } from "../../../../../utils/types/CanvasInterfaces";
import { getTextWidthAndHeight } from "../../../../../utils/shapeManagementUtils";
import { getInputXAlignment, getTextXAlignment } from "../../../../Templates/CanvasItem/Shapes/Inputs/SharedInputComponents/InputHelper";
import { EstimateFormFields } from "../../../../../utils/types/EstimateInterfaces";
import { format } from "date-fns";

interface PreviewDateInputProps {
    DateInputObj: DateInputObj;
    formInputs?: EstimateFormFields;
}

const PreviewDateInput = ({ DateInputObj, formInputs }: PreviewDateInputProps) => {
    const dateString = formInputs ? formInputs[DateInputObj.id].value : '';
    const val = dateString ? format(new Date(dateString), DateInputObj.dateFormat) : '';
    DateInputObj.content.placeHolder = val;
    const [datelabelShapeWidth, datelabelShapeHeight] = getTextWidthAndHeight(DateInputObj.label, DateInputObj.label.value);
    const [datecontentShapeWidth,] = getTextWidthAndHeight(DateInputObj.content, DateInputObj.content.placeHolder);
    const datecontainerWidth = Math.max(datelabelShapeWidth, datecontentShapeWidth);
    return (
        <Group
            key={DateInputObj.id}
            id={DateInputObj.id}
            x={DateInputObj.x}
            y={DateInputObj.y}
            rotation={DateInputObj.rotation}
        >
            {DateInputObj.hasLabel &&
                <Text
                    x={getTextXAlignment(DateInputObj.label, datecontainerWidth)}
                    y={0}
                    text={DateInputObj.label.value}
                    fontSize={DateInputObj.label.fontSize}
                    fontFamily={DateInputObj.label.fontFamily}
                    fill={DateInputObj.label.fill}
                    align={DateInputObj.label.horizontalAlign}
                />
            }
            <Text
                x={getInputXAlignment(DateInputObj.content, val, datecontainerWidth)}
                y={DateInputObj.hasLabel ? datelabelShapeHeight + (DateInputObj.label.fontSize / 10) : 0}
                text={val}
                fontSize={DateInputObj.content.fontSize}
                fontFamily={DateInputObj.content.fontFamily}
                fill={DateInputObj.content.fill}
                align={DateInputObj.content.horizontalAlign}
            />
        </Group>
    );
};

export default PreviewDateInput;
