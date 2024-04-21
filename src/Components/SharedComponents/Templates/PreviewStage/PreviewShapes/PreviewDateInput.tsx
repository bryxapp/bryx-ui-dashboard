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
    const dateInputLabel = DateInputObj.label;
    const dateInputContent = DateInputObj.content;
    const dateString = formInputs ? formInputs[DateInputObj.id].value : '';
    const val = dateString ? format(new Date(dateString), DateInputObj.dateFormat) : '';
    dateInputContent.placeHolder = val;
    const [datelabelShapeWidth, datelabelShapeHeight] = getTextWidthAndHeight(dateInputLabel, dateInputLabel.value);
    const [datecontentShapeWidth,] = getTextWidthAndHeight(dateInputContent, dateInputContent.placeHolder);
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
                    x={getTextXAlignment(dateInputLabel, datecontainerWidth, dateInputLabel.horizontalAlign)}
                    y={0}
                    text={dateInputLabel.value}
                    fontSize={dateInputLabel.fontSize}
                    fontFamily={dateInputLabel.fontFamily}
                    fill={dateInputLabel.fill}
                    align={dateInputLabel.horizontalAlign}
                />
            }
            <Text
                x={getInputXAlignment(dateInputContent, val, datecontainerWidth)}
                y={DateInputObj.hasLabel ? datelabelShapeHeight + (dateInputLabel.fontSize / 10) : 0}
                text={val}
                fontSize={dateInputContent.fontSize}
                fontFamily={dateInputContent.fontFamily}
                fill={dateInputContent.fill}
                align={dateInputContent.horizontalAlign}
            />
        </Group>
    );
};

export default PreviewDateInput;
