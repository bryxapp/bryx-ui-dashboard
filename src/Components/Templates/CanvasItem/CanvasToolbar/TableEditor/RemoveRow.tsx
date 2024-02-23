import React from 'react';
import { CanvasDesignData, ShapeObj, TextTableObj } from '../../../../../utils/types/CanvasInterfaces';
import { findShape } from '../../../../../utils/canvas-util';
import { IconButton, Tooltip } from '@mui/material';
import TableRowsIcon from '@mui/icons-material/TableRows';

interface RemoveRowProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

const RemoveRow: React.FC<RemoveRowProps> = ({ canvasDesign, setCanvasDesign }) => {

    const isDisabled = () => {
        const selectedShape = findShape(canvasDesign, canvasDesign.selectedId);
        if (!selectedShape || selectedShape.type !== 'TextTable') return true;
        let textTable = selectedShape as TextTableObj;
        return textTable.rows.length <= 1; // Disable if only one row is present
    };

    const handleRemoveRow = () => {
        // Find the currently selected shape
        const selectedShape = findShape(canvasDesign, canvasDesign.selectedId);
        if (!selectedShape || selectedShape.type !== 'TextTable') return;

        let textTable = selectedShape as TextTableObj;

        // Ensure there's more than one row to prevent removing all rows
        if (textTable.rows.length <= 1) return;

        // Remove the last row from the table
        textTable.rows.pop();

        // Create a new canvas design object with the updated text table
        const updatedCanvasDesign = {
            ...canvasDesign,
            Shapes: canvasDesign.Shapes.map((shape: ShapeObj) => {
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
        <Tooltip title="Remove Row">
            <IconButton
                color="primary"
                onClick={handleRemoveRow}
                disabled={isDisabled()}
            >
                -<TableRowsIcon />
            </IconButton>
        </Tooltip>
    );
};

export default RemoveRow;