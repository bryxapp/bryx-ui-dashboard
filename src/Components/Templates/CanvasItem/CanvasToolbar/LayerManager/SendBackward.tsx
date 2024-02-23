import React from 'react';
import { CanvasDesignData, ShapeObj } from '../../../../../utils/types/CanvasInterfaces';
import Tooltip from '@mui/material/Tooltip';
import BackwardIcon from '@mui/icons-material/ArrowLeft';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import { IconButton } from '@mui/material';
import { findShape } from '../../../../../utils/canvas-util';

interface SendBackwardProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

export default function SendBackward({ canvasDesign, setCanvasDesign }: SendBackwardProps) {

    const handleSendToBack = (event: any) => {
        if (!canvasDesign.selectedId) return;

        const selectedShape = findShape(canvasDesign, canvasDesign.selectedId);
        const otherShapes = canvasDesign.Shapes.filter((shape: ShapeObj) => shape.id !== canvasDesign.selectedId);

        const updatedCanvasDesign = {
            ...canvasDesign,
            Shapes: [selectedShape, ...otherShapes],
        };
        setCanvasDesign(updatedCanvasDesign);
    };

    const handleSendBackward = (event: any) => {
        if (!canvasDesign.selectedId) return;

        const selectedIndex = canvasDesign.Shapes.findIndex((shape: ShapeObj) => shape.id === canvasDesign.selectedId);
        if (selectedIndex === 0) return;

        const updatedShapes = [...canvasDesign.Shapes];
        [updatedShapes[selectedIndex - 1], updatedShapes[selectedIndex]] = [updatedShapes[selectedIndex], updatedShapes[selectedIndex - 1]];

        const updatedCanvasDesign = {
            ...canvasDesign,
            Shapes: updatedShapes,
        };
        setCanvasDesign(updatedCanvasDesign);
    };

    return (
        <>
            <Tooltip title="Send to Back">
                <IconButton
                    color="primary"
                    onClick={handleSendToBack}
                >
                    <FastRewindIcon /> Send to Back
                </IconButton>
            </Tooltip>
            <Tooltip title="Send Backward">
                <IconButton
                    color="primary"
                    onClick={handleSendBackward}
                >
                    <BackwardIcon /> Send Backward
                </IconButton>
            </Tooltip>
        </>
    );
}