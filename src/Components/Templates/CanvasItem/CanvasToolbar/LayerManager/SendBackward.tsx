import { ShapeObj } from '../../../../../utils/types/CanvasInterfaces';
import Tooltip from '@mui/material/Tooltip';
import BackwardIcon from '@mui/icons-material/ArrowLeft';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import { IconButton } from '@mui/material';
import { findShape } from '../../../../../utils/shapeManagementUtils';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';


export default function SendBackward() {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();

    const handleSendToBack = (event: any) => {
        if (!selectedId) return;

        const selectedShape = findShape(canvasDesign, selectedId);
        const otherShapes = canvasDesign.Shapes.filter((shape: ShapeObj) => shape.id !== selectedId);
        if (!selectedShape) return;

        const updatedCanvasDesign = {
            ...canvasDesign,
            Shapes: [selectedShape, ...otherShapes],
        };
        setCanvasDesign(updatedCanvasDesign);
    };

    const handleSendBackward = (event: any) => {
        if (!selectedId) return;

        const selectedIndex = canvasDesign.Shapes.findIndex((shape: ShapeObj) => shape.id === selectedId);
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