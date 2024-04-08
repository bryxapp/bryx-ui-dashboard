import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { Menu } from 'antd';
import { findShape } from '../../../../../utils/shapeManagementUtils';
import { ShapeObj } from '../../../../../utils/types/CanvasInterfaces';
import {MdArrowRight as ForwardIcon} from 'react-icons/md';
import {MdArrowLeft as BackwardIcon} from 'react-icons/md';
import {MdFastForward as FastForwardIcon} from 'react-icons/md';
import {MdFastRewind as FastRewindIcon} from 'react-icons/md';

export default function LayerManager() {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();

    const handleSendToBack = () => {
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

    const handleSendBackward = () => {
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

    const handleBringToFront = () => {
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

    const handleBringForward = () => {
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
        <Menu.Item key="sendBackward" onClick={handleSendBackward} icon={<BackwardIcon />}>
            Send Backward
        </Menu.Item>
        <Menu.Item key="sendToBack" onClick={handleSendToBack} icon={<FastRewindIcon />}>
            Send to Back
        </Menu.Item>
        <Menu.Item key="bringForward" onClick={handleBringForward} icon={<ForwardIcon />}>
            Bring Forward
        </Menu.Item>
        <Menu.Item key="bringToFront" onClick={handleBringToFront} icon={<FastForwardIcon />}>
            Bring to Front
        </Menu.Item>
        </>
    );
}