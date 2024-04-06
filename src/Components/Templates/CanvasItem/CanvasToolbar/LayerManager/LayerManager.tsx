import { useState } from 'react';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { Button, Dropdown, MenuProps } from 'antd';
import { findShape } from '../../../../../utils/shapeManagementUtils';
import { ShapeObj } from '../../../../../utils/types/CanvasInterfaces';
import {MdArrowRight as ForwardIcon} from 'react-icons/md';
import {MdArrowLeft as BackwardIcon} from 'react-icons/md';
import {MdFastForward as FastForwardIcon} from 'react-icons/md';
import {MdFastRewind as FastRewindIcon} from 'react-icons/md';
import {MdLayers as LayerIcon} from 'react-icons/md';

interface LayerManagerProps {
    isLoading: boolean;
}

export default function LayerManager({ isLoading }: LayerManagerProps) {
    const [open, setOpen] = useState(false);
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

    const items: MenuProps['items'] = [
        {
            key: 'sendBackward',
            onClick: () => {
                handleSendBackward();
            },
            icon: <BackwardIcon />,
            label: 'Send Backward',
        },
        {
            key: 'sendToBack',
            onClick: () => {
                handleSendToBack();
            },
            icon: <FastRewindIcon />,
            label: 'Send to Back',
        },
        {
            key: 'bringForward',
            onClick: () => {
                handleBringForward();
            },
            icon: <ForwardIcon />,
            label: 'Bring Forward',
        },
        {
            key: 'bringToFront',
            onClick: () => {
                handleBringToFront();
            },
            icon: <FastForwardIcon />,
            label: 'Bring to Front',
        },
    ];

    return (
        <Dropdown
            menu={{ items }}
            trigger={['click']}
            onOpenChange={(flag) => setOpen(flag)}
            open={open}
            disabled={isLoading}
        >

            <Button size="large" icon={<LayerIcon />} />
        </Dropdown>
    );
}