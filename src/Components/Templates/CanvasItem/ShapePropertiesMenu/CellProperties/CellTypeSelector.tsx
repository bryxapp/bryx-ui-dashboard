import { Select, Typography } from 'antd';
import { CellInputObj, ShapeObj, TableCellObj, TableInputObj, TextCellObj } from '../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { createInputCellObj, createTextCellObj } from '../../../../../utils/types/ShapesFactory';

const { Option } = Select;

interface CellTypeSelectorProps {
    tableCellObj: TableCellObj;
}

export default function CellTypeSelector({ tableCellObj }: CellTypeSelectorProps) {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();

    const selectedCellType = tableCellObj.content?.type;

    const mapCellTypeToLabel = (cellType: string) => {
        switch (cellType) {
            case 'CellInput':
                return 'Input';
            case 'TextCell':
                return 'Text';
            case 'Empty':
                return 'Empty';
            default:
                return 'Text';
        }
    }

    const convertTextObject = (shape: TextCellObj | CellInputObj, type: string) => {
        switch (type) {
            case "Input":
                {
                    const textCellObj = shape as TextCellObj;
                    let { id, x, y, value, fontSize, fontFamily, fontStyle, textDecoration, rotation, fill } = textCellObj;
                    return {
                        id,
                        x,
                        y,
                        fontSize,
                        fontFamily,
                        fontStyle,
                        textDecoration,
                        type: "CellInput",
                        displayName: value,
                        rotation,
                        fill,
                        value,
                    } as CellInputObj;
                }
            case "Text":
                {
                    const TextInputObj = shape as CellInputObj;
                    const { id, x, y, value, fontSize, fontFamily, fontStyle, textDecoration, rotation, fill } = TextInputObj;
                    return {
                        id,
                        x,
                        y,
                        fontSize,
                        fontFamily,
                        fontStyle,
                        textDecoration,
                        type: "TextCell",
                        value,
                        rotation,
                        fill
                    } as TextCellObj;
                }
            case "Empty":
                return null;
            default:
                return shape;
        }
    };

    const handleTextObjectChange = (selectedType: string) => {
        let foundAndUpdated = false;
        const updatedShapes = canvasDesign.Shapes.map((shape: ShapeObj) => {
            if (shape.type === "TableInput") {
                const textTable = shape as TableInputObj;
                const updatedRows = textTable.rows.map((row, rowIndex) =>
                    row.map(cell => {
                        if (!foundAndUpdated && cell.id === selectedId) {
                            foundAndUpdated = true;
                            const currentRowY = textTable.y + rowIndex * cell.height;
                            if (cell.content) {
                                cell.content = convertTextObject(cell.content, selectedType);
                            }
                            else if (selectedType === "Empty") {
                                cell.content = null;
                            }
                            else if (selectedType === "Text") {
                                cell.content = createTextCellObj(`text-field`, 12, 'black', 'Arial', 'normal', 'none', cell.x, currentRowY);
                            }
                            else if (selectedType === "Input") {
                                cell.content = createInputCellObj(`text-input`, 12, 'black', 'Arial', 'normal', 'none', cell.x, currentRowY);
                            }
                        }
                        return cell;
                    })
                );
                return { ...shape, rows: updatedRows };
            }
            return shape;
        });

        if (foundAndUpdated) {
            setCanvasDesign({ ...canvasDesign, Shapes: updatedShapes });
        }
    };


    return (
        <>
        <Typography.Text>Cell Type</Typography.Text>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Select
                value={selectedCellType ? mapCellTypeToLabel(selectedCellType) : 'Empty'}
                onChange={handleTextObjectChange}
                size='small'
                popupMatchSelectWidth={false}
                dropdownStyle={{ maxHeight: 250 }}
            >
                <Option key={"Input"} value={"Input"}>
                    Input
                </Option>
                <Option key={"Text"} value={"Text"}>
                    Text
                </Option>
                <Option key={"Empty"} value={"Empty"}>
                    Empty
                </Option>
            </Select>
        </div>
        </>
    );
}