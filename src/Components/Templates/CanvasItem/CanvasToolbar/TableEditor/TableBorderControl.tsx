import React, { useEffect, useState } from 'react';
import { CanvasDesignData, ShapeObj, TextTableObj } from '../../../../../utils/types/CanvasInterfaces';
import { ToggleButton, Tooltip } from '@mui/material';
import BorderAllIcon from '@mui/icons-material/BorderAll'; // Icon for border control
import { findShape } from '../../../../../utils/shapeManagementUtils';

interface TableBorderToggleProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

const TableBorderToggle: React.FC<TableBorderToggleProps> = ({ canvasDesign, setCanvasDesign }) => {
    const [borderEnabled, setBorderEnabled] = useState(false);

    // Check and set initial border state based on the selected shape
    useEffect(() => {
        const selectedShape = findShape(canvasDesign, canvasDesign.selectedId);
        if (selectedShape && selectedShape.type === 'TextTable') {
            const textTable = selectedShape as TextTableObj;
            // Assuming border visibility is determined by the presence of a border property
            setBorderEnabled(!!textTable.border);
        }
    }, [canvasDesign.selectedId, canvasDesign.Shapes, canvasDesign]);

    const handleBorderToggle = () => {
        const selectedShape = findShape(canvasDesign, canvasDesign.selectedId);
        if (!selectedShape || selectedShape.type !== 'TextTable') return;

        let textTable = selectedShape as TextTableObj;

        // Toggle the border property based on the current state
        const newBorder = !borderEnabled ? { width: 1, color: 'black', style: 'solid' } : null;

        // Update the textTable object with the new border settings
        const updatedTable = { ...textTable, border: newBorder };

        // Update the canvas design with the new table settings
        const updatedCanvasDesign = {
            ...canvasDesign,
            Shapes: canvasDesign.Shapes.map((shape: ShapeObj) => {
                if (shape.id === canvasDesign.selectedId) {
                    return updatedTable;
                }
                return shape;
            }),
        };

        setCanvasDesign(updatedCanvasDesign);
        setBorderEnabled(!borderEnabled);
    };

    return (
        <Tooltip title="Toggle Table Border">
            <ToggleButton
                color="primary"
                selected={borderEnabled}
                onChange={handleBorderToggle}
                value="check"
            >
                <BorderAllIcon />
            </ToggleButton>
        </Tooltip>
    );
};

export default TableBorderToggle;
