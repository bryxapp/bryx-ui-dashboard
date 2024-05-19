import { Group, Text } from "react-konva";
import { DateInputObj } from "../../../../../utils/types/CanvasInterfaces";
import { getTextWidthAndHeight } from "../../../../../utils/shapeManagementUtils";
import { getInputXAlignment } from "../../../../Templates/CanvasItem/Shapes/Inputs/Input/InputHelper";
import { EstimateFormFields } from "../../../../../utils/types/EstimateInterfaces";
import { format } from "date-fns";

interface PreviewDateInputProps {
    DateInputObj: DateInputObj;
    formInputs?: EstimateFormFields;
}

const PreviewDateInput = ({ DateInputObj, formInputs }: PreviewDateInputProps) => {
    const dateString = formInputs ? formInputs[DateInputObj.id].value : '';
    const val = dateString ? format(new Date(dateString), DateInputObj.dateFormat) : '';
    DateInputObj.value = val;
    const [datecontentShapeWidth,] = getTextWidthAndHeight(DateInputObj);
    const containerWidth = Math.max(DateInputObj.width, datecontentShapeWidth);
    return (
        <Group
            key={DateInputObj.id}
            id={DateInputObj.id}
            x={DateInputObj.x}
            y={DateInputObj.y}
            rotation={DateInputObj.rotation}
        >
            <Text
                x={getInputXAlignment(DateInputObj, containerWidth)}
                y={0}
                text={val}
                fontSize={DateInputObj.fontSize}
                fontFamily={DateInputObj.fontFamily}
                fill={DateInputObj.fill}
                align={DateInputObj.horizontalAlign}
            />
        </Group>
    );
};

export default PreviewDateInput;
