import React from 'react';
import { CanvasDesignData, ShapeObj, TextTableObj } from '../../../../../utils/types/CanvasInterfaces';
import { IconButton, Tooltip } from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { findShape } from '../../../../../utils/shapeManagementUtils';

interface RemoveColProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

const RemoveCol: React.FC<RemoveColProps> = ({ canvasDesign, setCanvasDesign }) => {

    const isDisabled = () => {
        const selectedShape = findShape(canvasDesign, canvasDesign.selectedId);
        if (!selectedShape || selectedShape.type !== 'TextTable') return true;
        let textTable = selectedShape as TextTableObj;
        return textTable.rows[0].length <= 1; // Disable if only one column is present
    };

    const handleRemoveCol = () => {
        // Find the currently selected shape
        const selectedShape = findShape(canvasDesign, canvasDesign.selectedId);
        if (!selectedShape || selectedShape.type !== 'TextTable') return;

        let textTable = selectedShape as TextTableObj;

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
        <Tooltip title="Remove Column">
            <IconButton
                color="primary"
                onClick={handleRemoveCol}
                disabled={isDisabled()}
            >
                -<ViewColumnIcon />
            </IconButton>
        </Tooltip>
    );
};

export default RemoveCol;