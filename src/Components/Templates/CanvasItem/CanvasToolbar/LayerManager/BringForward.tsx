import React from 'react';
import IconButton from '@mui/material/IconButton';
import { ShapeObj } from '../../../../../utils/types/CanvasInterfaces';
import Tooltip from '@mui/material/Tooltip';
import ForwardIcon from '@mui/icons-material/ArrowRight';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { findShape } from '../../../../../utils/shapeManagementUtils';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';

export default function BringForward() {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();

    const handleBringToFront = (event: any) => {
        if (!selectedId) return;

        const selectedShape = findShape(canvasDesign, selectedId);
        if (!selectedShape) return;
        const otherShapes = canvasDesign.Shapes.filter((shape: ShapeObj) => shape.id !== selectedId);

        const updatedCanvasDesign = {
            ...canvasDesign,
            Shapes: [...otherShapes, selectedShape],
        };
        setCanvasDesign(updatedCanvasDesign);
    };

    const handleBringForward = (event: any) => {
        if (!selectedId) return;

        const selectedIndex = canvasDesign.Shapes.findIndex((shape: ShapeObj) => shape.id === selectedId);
        if (selectedIndex === canvasDesign.Shapes.length - 1) return;

        const updatedShapes = [...canvasDesign.Shapes];
        [updatedShapes[selectedIndex], updatedShapes[selectedIndex + 1]] = [updatedShapes[selectedIndex + 1], updatedShapes[selectedIndex]];

        const updatedCanvasDesign = {
            ...canvasDesign,
            Shapes: updatedShapes,
        };
        setCanvasDesign(updatedCanvasDesign);
    };

    return (
        <>
            <Tooltip title="Bring Forward">
                <IconButton
                    color='primary'
                    onClick={handleBringForward}
                >
                    <ForwardIcon /> Bring Forward
                </IconButton>
            </Tooltip>
            <Tooltip title="Bring to Front">
                <IconButton
                    color='primary'
                    onClick={handleBringToFront}
                >
                    <FastForwardIcon /> Bring to Front
                </IconButton>
            </Tooltip>
        </>
    );
}