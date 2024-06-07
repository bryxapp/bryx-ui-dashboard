import { useState } from 'react';
import { Stage, Layer } from 'react-konva';
import { ShapeObj } from '../../../../utils/types/CanvasInterfaces';
import { CanvasStarterData } from '../../../../utils/types/CanvasInterfaces';
import { CanvasStarters } from '../../../../utils/canvas-starters';
import { useCanvasKeyboardShortcuts } from '../useCanvasKeyboardShortcuts';
import ShapeRenderer from './ShapeRenderer';
import { getWebCanvasDimensions } from '../../../../utils/canvasUtils';
import { useCanvasDesignContext } from '../../../../utils/contexts/canvasDesignContext';
import PiecePaper from '../../../SharedComponents/PiecePaper/PiecePaper';

const CanvasStage = () => {
    const { canvasDesign, setCanvasDesign, selectedId, setSelectedId, undoLastChange, redoLastChange } = useCanvasDesignContext();
    const [pageWidth, pageHeight] = getWebCanvasDimensions(canvasDesign);

    //Parse url to get canvas starter name
    const urlParams = new URLSearchParams(window.location.search);
    const canvasStarterName = urlParams.get('canvasStarterName');

    if (canvasStarterName && canvasDesign.Shapes.length === 0) {
        const canvasStarter = CanvasStarters.find((canvasStarter: CanvasStarterData) => canvasStarter.name === canvasStarterName);
        if (canvasStarter) {
            setCanvasDesign(canvasStarter.canvasDesign);
        }
    }
    const [copiedObject, setCopiedObject] = useState<ShapeObj | null>(null);

    useCanvasKeyboardShortcuts({ canvasDesign, setCanvasDesign, selectedId, setSelectedId, copiedObject, setCopiedObject, undoLastChange, redoLastChange });

    const checkDeselect = (e: any) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelectedId(null)
        }
    };


    return (
        <PiecePaper
            pageWidth={pageWidth}
            pageHeight={pageHeight}
        >
            <Stage
                width={pageWidth}
                height={pageHeight}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
            >
                <Layer >
                    {/* Place all shapes on the canvas */}
                    <ShapeRenderer />
                </Layer>
            </Stage>
        </PiecePaper>
    );
};

export default CanvasStage;