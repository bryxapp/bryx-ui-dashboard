import { Group, Line, Rect, Text } from "react-konva";
import { TableInputObj } from "../../../../../utils/types/CanvasInterfaces";
import { EstimateFormFields } from "../../../../../utils/types/EstimateInterfaces";
import { drawBorders } from "../../../../Templates/CanvasItem/Shapes/Inputs/TableInput/tableUtils";
import EmptyCell from "../../../../Templates/CanvasItem/Shapes/Inputs/TableInput/EmptyCell";
import { FILL_COLOR } from "../../../../Templates/CanvasItem/Shapes/Inputs/Input/InputHelper";

interface PreviewTableInputProps {
    tableInputObj: TableInputObj;
    showInputFillColor: boolean;
    formInputs?: EstimateFormFields;

}

const PreviewTableInput = ({ tableInputObj, formInputs, showInputFillColor }: PreviewTableInputProps) => {
    return (
        <Group
            key={tableInputObj.id}
            id={tableInputObj.id}
            x={tableInputObj.x}
            y={tableInputObj.y}
        >
            {tableInputObj.rows.map((row, rowIndex) => (
                row.map((cell, cellIndex) => {
                    if (!cell.content) return <EmptyCell key={`${rowIndex}-${cellIndex}`} emptyCellObj={cell} containerWidth={cell.width} containerHeight={cell.height} />;
                    const isInputCell = cell.content.type === 'CellInput';
                    const cellXPosition = row.slice(0, cellIndex).reduce((acc, prevCell) => acc + prevCell.width, 0);
                    const cellYPosition = tableInputObj.rows.slice(0, rowIndex).reduce((acc, prevRow) => acc + prevRow[0].height, 0);
                    let value = cell.content.value;
                    if (isInputCell && formInputs) {
                        value = formInputs[cell.id].value || '';
                    }
                    return (
                        <Group
                            key={`${rowIndex}-${cellIndex}`}
                            id={cell.id}
                            x={cellXPosition + 2}
                            y={cellYPosition + 2}
                            draggable={false}
                        >
                            {isInputCell && showInputFillColor && (
                                <Rect
                                    width={cell.width - 4}
                                    height={cell.height - 4}
                                    fill={FILL_COLOR}
                                />)}
                            <Text
                                text={value}
                                fontSize={cell.content.fontSize}
                                fill={cell.content.fill}
                                width={cell.width - 4}
                                height={cell.height - 4}
                                fontFamily={cell.content.fontFamily}
                                fontStyle={cell.content.fontStyle}
                                textDecoration={cell.content.textDecoration}
                                align={cell.horizontalAlign}
                                verticalAlign={cell.verticalAlign}
                                draggable={false}
                            />
                        </Group>
                    );

                })
            ))}
            {drawBorders(tableInputObj).map((lineProps) => (
                <Line {...lineProps} />
            ))}
        </Group>
    );
};

export default PreviewTableInput;
