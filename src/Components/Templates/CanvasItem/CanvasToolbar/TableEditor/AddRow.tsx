import React from 'react';
import { CanvasDesignData, ShapeObj, TextTableObj } from '../../../../../utils/types/CanvasInterfaces';
import { findShape } from '../../../../../utils/canvas-util';
import { IconButton, Tooltip } from '@mui/material';
import { generateShapeId } from '../../../../../utils/shapeid-util';
import TableRowsIcon from '@mui/icons-material/TableRows';

interface AddRowProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

const AddRow: React.FC<AddRowProps> = ({ canvasDesign, setCanvasDesign }) => {

    const handleAddRow = () => {
        // Find the currently selected shape
        const selectedShape = findShape(canvasDesign, canvasDesign.selectedId);
        if (!selectedShape || selectedShape.type !== 'TextTable') return;

        // Ensure the selected shape is indeed a TextTableObj
        let textTable = selectedShape as TextTableObj;

        // Get a deep copy of the last row in the table
        let lastRow = textTable.rows[textTable.rows.length - 1];
        let newRow = lastRow.map(cell => {
            // Deep clone each cell in the row
            let newCell = JSON.parse(JSON.stringify(cell));
            // Assign a unique ID to each new cell
            newCell.id = generateShapeId();
            newCell.content.id = generateShapeId();
            return newCell;
        });

        // Add the new row to the text table
        textTable.rows.push(newRow);

        // Create a new canvas design object with the updated text table
        const updatedCanvasDesign = {
            ...canvasDesign,
            Shapes: canvasDesign.Shapes.map((shape: ShapeObj) => {
                // Replace the original text table with the updated one
                if (shape.id === canvasDesign.selectedId) {
                    return textTable;
                }
                return shape;
            }),
        };

        // Update the canvas design state
        setCanvasDesign(updatedCanvasDesign);
    };

    return (
        <Tooltip title="Add Row">
            <IconButton
                color="primary"
                onClick={handleAddRow}
            >
                +<TableRowsIcon />
            </IconButton>
        </Tooltip>
    );
};

export default AddRow;
