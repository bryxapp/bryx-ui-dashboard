import { Button, Tooltip, Typography } from 'antd';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { findShape, generateShapeId } from '../../../../../utils/shapeManagementUtils';
import { ShapeObj, TableInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { TbColumnInsertLeft, TbRowInsertBottom, TbColumnRemove, TbRowRemove } from "react-icons/tb";

export default function TableManagement() {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();

    const handleAddCol = () => {
        // Find the currently selected shape
        const selectedShape = findShape(canvasDesign, selectedId);
        if (!selectedShape || selectedShape.type !== 'TableInput') return;

        // Cast the selected shape to TextTableObj after ensuring it's the correct type
        let textTable = selectedShape as TableInputObj;

        // Determine the index of the last column
        let length = textTable.rows[0].length - 1;

        // Iterate over each row to add a new column
        for (let i = 0; i < textTable.rows.length; i++) {
            // Deep clone the last cell in the current row
            let newCell = JSON.parse(JSON.stringify(textTable.rows[i][length]));
            // Generate a new ID for the cloned cell
            if (newCell.content) {
                newCell.id = generateShapeId();
            }
            newCell.id = generateShapeId();
            // Add the cloned cell to the end of the current row
            textTable.rows[i].push(newCell);
        }

        // Create a new canvas design object with the updated text table
        const updatedCanvasDesign = {
            ...canvasDesign,
            Shapes: canvasDesign.Shapes.map((shape: ShapeObj) => {
                // Replace the original text table with the updated one
                if (shape.id === selectedId) {
                    return textTable;
                }
                return shape;
            }),
        };

        // Update the canvas design state
        setCanvasDesign(updatedCanvasDesign);
    };

    const handleAddRow = () => {
        // Find the currently selected shape
        const selectedShape = findShape(canvasDesign, selectedId);
        if (!selectedShape || selectedShape.type !== 'TableInput') return;

        // Ensure the selected shape is indeed a TextTableObj
        let textTable = selectedShape as TableInputObj;

        // Get a deep copy of the last row in the table
        let lastRow = textTable.rows[textTable.rows.length - 1];
        let newRow = lastRow.map(cell => {
            // Deep clone each cell in the row
            let newCell = JSON.parse(JSON.stringify(cell));
            // Assign a unique ID to each new cell
            newCell.id = generateShapeId();
            if (newCell.content) newCell.id = generateShapeId();
            return newCell;
        });

        // Add the new row to the text table
        textTable.rows.push(newRow);

        // Create a new canvas design object with the updated text table
        const updatedCanvasDesign = {
            ...canvasDesign,
            Shapes: canvasDesign.Shapes.map((shape: ShapeObj) => {
                // Replace the original text table with the updated one
                if (shape.id === selectedId) {
                    return textTable;
                }
                return shape;
            }),
        };

        // Update the canvas design state
        setCanvasDesign(updatedCanvasDesign);
    };

    const isRemoveColDisabled = () => {
        const selectedShape = findShape(canvasDesign, selectedId);
        if (!selectedShape || selectedShape.type !== 'TableInput') return true;
        let textTable = selectedShape as TableInputObj;
        return textTable.rows[0].length <= 1; // Disable if only one column is present
    };

    const handleRemoveCol = () => {
        // Find the currently selected shape
        const selectedShape = findShape(canvasDesign, selectedId);
        if (!selectedShape || selectedShape.type !== 'TableInput') return;

        let textTable = selectedShape as TableInputObj;

        // Ensure there's more than one column to prevent removing all columns
        if (textTable.rows[0].length <= 1) return;

        // Iterate over each row to remove the last column
        textTable.rows.forEach(row => {
            row.pop(); // Removes the last element (cell) from each row
        });

        // Create a new canvas design object with the updated text table
        const updatedCanvasDesign = {
            ...canvasDesign,
            Shapes: canvasDesign.Shapes.map((shape: ShapeObj) => {
                if (shape.id === selectedId) {
                    return textTable;
                }
                return shape;
            }),
        };

        // Update the canvas design state
        setCanvasDesign(updatedCanvasDesign);
    };

    const isRemoveRowDisabled = () => {
        const selectedShape = findShape(canvasDesign, selectedId);
        if (!selectedShape || selectedShape.type !== 'TableInput') return true;
        let textTable = selectedShape as TableInputObj;
        return textTable.rows.length <= 1; // Disable if only one row is present
    };

    const handleRemoveRow = () => {
        // Find the currently selected shape
        const selectedShape = findShape(canvasDesign, selectedId);
        if (!selectedShape || selectedShape.type !== 'TableInput') return;

        let textTable = selectedShape as TableInputObj;

        // Ensure there's more than one row to prevent removing all rows
        if (textTable.rows.length <= 1) return;

        // Remove the last row from the table
        textTable.rows.pop();

        // Create a new canvas design object with the updated text table
        const updatedCanvasDesign = {
            ...canvasDesign,
            Shapes: canvasDesign.Shapes.map((shape: ShapeObj) => {
                if (shape.id === selectedId) {
                    return textTable;
                }
                return shape;
            }),
        };

        // Update the canvas design state
        setCanvasDesign(updatedCanvasDesign);
    };


    return (
        <>
            <Typography.Text style={{ marginRight: 10 }}>Rows & Columns</Typography.Text>
            <div style={{ display: "flex", alignItems: "center" }}>

                <Tooltip title="Add Column" placement='bottom'>
                    <Button
                        type="link"
                        size="large"
                        icon={<TbColumnInsertLeft size={"large"} />}
                        onClick={handleAddCol}
                    />
                </Tooltip>
                <Tooltip title="Remove Column" placement='bottom'>
                    <Button
                        type="link"
                        size="large"
                        icon={<TbColumnRemove size={"large"} />}
                        onClick={handleRemoveCol}
                        disabled={isRemoveColDisabled()}
                    />
                </Tooltip>
                <Tooltip title="Add Row" placement='bottom'>
                    <Button
                        type="link"
                        size="large"
                        icon={<TbRowInsertBottom size={"large"} />}
                        onClick={handleAddRow}
                    />
                </Tooltip>
                <Tooltip title="Remove Row" placement='bottom'>
                    <Button
                        type="link"
                        size="large"
                        icon={<TbRowRemove size={"large"} />}
                        onClick={handleRemoveRow}
                        disabled={isRemoveRowDisabled()}
                    />
                </Tooltip>
            </div>
        </>
    );
}