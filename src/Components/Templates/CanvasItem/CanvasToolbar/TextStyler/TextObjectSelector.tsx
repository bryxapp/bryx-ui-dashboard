import React from 'react';
import Typography from "@mui/material/Typography";
import { CanvasDesignData, ShapeObj, TextFieldObj, TextInputObj, TextTableObj } from '../../../../../utils/types/CanvasInterfaces';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import { getTextShape } from '../../../../../utils/shapeManagementUtils';
import { createTextFieldObj, createTextInputObj } from '../../../../../utils/types/ShapesFactory';


interface TextObjectSelectorProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

const TextObjectSelector = ({ canvasDesign, setCanvasDesign }: TextObjectSelectorProps) => {

    const convertTextObject = (shape: TextFieldObj | TextInputObj, type: string) => {
        switch (type) {
            case "TextInput":
                {
                    const TextFieldObj = shape as TextFieldObj;
                    let { id, x, y, value, fontSize, fontFamily, fontStyle, textDecoration, align, rotation, isDragging, fill } = TextFieldObj;
                    return {
                        id,
                        x,
                        y,
                        fontSize,
                        fontFamily,
                        fontStyle,
                        textDecoration,
                        align,
                        type: "TextInput",
                        displayName: value,
                        rotation,
                        isDragging,
                        fill,
                        format: "text"
                    } as TextInputObj;
                }
            case "TextField":
                {
                    const TextInputObj = shape as TextInputObj;
                    const { id, x, y, displayName, fontSize, fontFamily, fontStyle, textDecoration, align, rotation, isDragging, fill } = TextInputObj;
                    return {
                        id,
                        x,
                        y,
                        fontSize,
                        fontFamily,
                        fontStyle,
                        textDecoration,
                        align,
                        type: "TextField",
                        value: displayName,
                        rotation,
                        isDragging,
                        fill
                    } as TextFieldObj;
                }
            case "Empty":
                return null;
            default:
                return shape;
        }
    };
    
    const handleTextObjectChange = (event: any) => {
        let foundAndUpdated = false;
        const updatedShapes = canvasDesign.Shapes.map((shape: ShapeObj) => {
            if (shape.type === "TextTable") {
                const textTable = shape as TextTableObj;
                const updatedRows = textTable.rows.map((row, rowIndex) =>
                    row.map(cell => {
                        if (!foundAndUpdated && cell.id === canvasDesign.selectedId) {
                            foundAndUpdated = true;
                            const currentRowY = textTable.y + rowIndex * cell.height;
                            if (cell.content) {
                                cell.content = convertTextObject(cell.content, event.target.value);
                            }
                            else if (event.target.value === "Empty") {
                                cell.content = null;
                            }
                            else if (event.target.value === "TextField") {
                                cell.content = createTextFieldObj(`text-field`, 12, 'black', 'Arial', 'normal', 'none', true, cell.x, currentRowY);
                            }
                            else if (event.target.value === "TextInput") {
                                cell.content = createTextInputObj(`text-input`, 12, 'black', 'Arial', 'normal', 'none', true, cell.x, currentRowY);
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

    const selectedTextObjectType = (getTextShape(canvasDesign, canvasDesign.selectedId))?.type ?? '';

    return (
        <>
            <Typography variant="body1" >
                Type
            </Typography>
            <Select
                value={selectedTextObjectType || ''}
                onChange={handleTextObjectChange}
                variant="outlined"
                style={{ marginBottom: '1rem', minWidth: '4.5rem', margin: 10 }}
                size='small'
            >
                <MenuItem key={"TextInput"} value={"TextInput"}>
                    Text Input
                </MenuItem>
                <MenuItem key={"TextField"} value={"TextField"}>
                    Text Field
                </MenuItem>
                <MenuItem key={"Empty"} value={"Empty"}>
                    Empty
                </MenuItem>
            </Select>
        </>
    );
};

export default TextObjectSelector;
