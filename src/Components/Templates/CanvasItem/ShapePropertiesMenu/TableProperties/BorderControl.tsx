import { Switch, Typography } from 'antd';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { findShape } from '../../../../../utils/shapeManagementUtils';
import { ShapeObj, TableInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { useEffect, useState } from 'react';

export default function BorderControl() {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();
    const [borderEnabled, setBorderEnabled] = useState(false);

    useEffect(() => {
        const selectedShape = findShape(canvasDesign, selectedId);
        if (selectedShape && selectedShape.type === 'TableInput') {
            const textTable = selectedShape as TableInputObj;
            // Assuming border visibility is determined by the presence of a border property
            setBorderEnabled(!!textTable.border);
        }
    }, [selectedId, canvasDesign.Shapes, canvasDesign]);

    const handleBorderToggle = () => {
        const selectedShape = findShape(canvasDesign, selectedId);
        if (!selectedShape || selectedShape.type !== 'TableInput') return;

        let textTable = selectedShape as TableInputObj;

        // Toggle the border property based on the current state
        const newBorder = !borderEnabled ? { width: 1, color: 'black', style: 'solid' } : null;

        // Update the textTable object with the new border settings
        const updatedTable = { ...textTable, border: newBorder };

        // Update the canvas design with the new table settings
        const updatedCanvasDesign = {
            ...canvasDesign,
            Shapes: canvasDesign.Shapes.map((shape: ShapeObj) => {
                if (shape.id === selectedId) {
                    return updatedTable;
                }
                return shape;
            }),
        };

        setCanvasDesign(updatedCanvasDesign);
        setBorderEnabled(!borderEnabled);
    };

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <Typography.Text style={{ marginRight: 10 }}>Border</Typography.Text>
            <Switch
                checked={borderEnabled}
                onChange={handleBorderToggle}
            />
        </div>
    );
}