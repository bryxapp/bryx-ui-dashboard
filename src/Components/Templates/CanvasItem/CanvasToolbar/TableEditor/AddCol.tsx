import React from 'react';
import { CanvasDesignData, ShapeObj, TextTableObj } from '../../../../../utils/types/CanvasInterfaces';
import { findShape } from '../../../../../utils/canvas-util';
import { IconButton, Tooltip } from '@mui/material';
import { generateShapeId } from '../../../../../utils/shapeid-util';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';

interface AddColProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

const AddCol: React.FC<AddColProps> = ({ canvasDesign, setCanvasDesign }) => {

    const handleAddCol = () => {
        // Find the currently selected shape
        const selectedShape = findShape(canvasDesign, canvasDesign.selectedId);
        if (!selectedShape || selectedShape.type !== 'TextTable') return;

        // Cast the selected shape to TextTableObj after ensuring it's the correct type
        let textTable = selectedShape as TextTableObj;

        // Determine the index of the last column
        let length = textTable.rows[0].length - 1;

        // Iterate over each row to add a new column
        for (let i = 0; i < textTable.rows.length; i++) {
            // Deep clone the last cell in the current row
            let newCell = JSON.parse(JSON.stringify(textTable.rows[i][length]));
            // Generate a new ID for the cloned cell
            newCell.id = generateShapeId();
            // Add the cloned cell to the end of the current row
            textTable.rows[i].push(newCell);
        }

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
        <Tooltip title="Add Column">
            <IconButton
                color="primary"
                onClick={handleAddCol}
            >
                +<ViewColumnIcon />
            </IconButton>
        </Tooltip>
    );
};

export default AddCol;
