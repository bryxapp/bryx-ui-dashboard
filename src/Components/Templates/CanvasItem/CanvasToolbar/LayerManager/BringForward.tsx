import React from 'react';
import IconButton from '@mui/material/IconButton';
import { CanvasDesignData, ShapeObj } from '../../../../../utils/types/CanvasInterfaces';
import Tooltip from '@mui/material/Tooltip';
import ForwardIcon from '@mui/icons-material/ArrowRight';
import FastForwardIcon from '@mui/icons-material/FastForward';

interface BringForwardProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
}

export default function BringForward({ canvasDesign, setCanvasDesign }: BringForwardProps) {

    const handleBringToFront = (event: any) => {
        if (!canvasDesign.selectedId) return;

        const selectedShape = canvasDesign.Shapes.find((shape: ShapeObj) => shape.id === canvasDesign.selectedId);
        const otherShapes = canvasDesign.Shapes.filter((shape: ShapeObj) => shape.id !== canvasDesign.selectedId);

        const updatedCanvasDesign = {
            ...canvasDesign,
            Shapes: [...otherShapes, selectedShape],
        };
        setCanvasDesign(updatedCanvasDesign);
    };

    const handleBringForward = (event: any) => {
        if (!canvasDesign.selectedId) return;

        const selectedIndex = canvasDesign.Shapes.findIndex((shape: ShapeObj) => shape.id === canvasDesign.selectedId);
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