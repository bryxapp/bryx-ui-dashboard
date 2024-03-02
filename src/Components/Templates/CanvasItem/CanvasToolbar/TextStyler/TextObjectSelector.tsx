import React from 'react';
import Typography from "@mui/material/Typography";
import { CanvasDesignData, ShapeObj, TextFieldObj, TextInputObj, TextTableObj } from '../../../../../utils/types/CanvasInterfaces';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import { findShape } from '../../../../../utils/shapeManagementUtils';


interface TextObjectSelectorProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

const TextObjectSelector = ({ canvasDesign, setCanvasDesign }: TextObjectSelectorProps) => {

    const convertTextObject = (shape: ShapeObj, type: string) => {
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
                    };
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
                    };
                }
            case "Empty":
                return null;
            default:
                return shape;
        }
    };
    const handleTextObjectChange = (event: any) => {
        let foundAndUpdated = false;

        const updateShape = (shape: ShapeObj) => {
            if (shape.id === canvasDesign.selectedId && !foundAndUpdated) {
                foundAndUpdated = true;
                return convertTextObject(shape, event.target.value);
            }
            return shape;
        };

        const updatedShapes = canvasDesign.Shapes.map((shape: ShapeObj) => {
            if (shape.type === "TextTable") {
                const textTable = shape as TextTableObj;
                const updatedRows = textTable.rows.map(row =>
                    row.map(cell => updateShape(cell))
                );
                return { ...shape, rows: updatedRows };
            }
            return updateShape(shape);
        });

        if (foundAndUpdated) {
            setCanvasDesign({ ...canvasDesign, Shapes: updatedShapes });
        }
    };


    const selectedTextObjectType = (findShape(canvasDesign, canvasDesign.selectedId))?.type ?? '';

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
