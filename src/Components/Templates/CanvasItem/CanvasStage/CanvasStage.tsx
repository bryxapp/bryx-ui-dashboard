import { useRef, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import { ShapeObj } from '../../../../utils/types/CanvasInterfaces';
import { CanvasStarterData } from '../../../../utils/types/CanvasInterfaces';
import { CanvasStarters } from '../../../../utils/canvas-starters';
import { useCanvasKeyboardShortcuts } from '../useCanvasKeyboardShortcuts';
import ShapeRenderer from './ShapeRenderer';
import { getWebCanvasDimensions } from '../../../../utils/canvasUtils';
import { useCanvasDesignContext } from '../../../../utils/contexts/canvasDesignContext';
import PiecePaper from '../../../SharedComponents/PiecePaper/PiecePaper';
import ShapePopUp from '../ShapePopUp';


const CanvasStage = () => {
    const { canvasDesign, setCanvasDesign, selectedId, setSelectedId } = useCanvasDesignContext();
    const [pageWidth, pageHeight] = getWebCanvasDimensions(canvasDesign);
    const stageRef = useRef(null); // Create a ref here

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

    useCanvasKeyboardShortcuts({ canvasDesign, setCanvasDesign, selectedId, setSelectedId, copiedObject, setCopiedObject });

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
            refProp={stageRef}
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
            <ShapePopUp stageRef={stageRef}/>
        </PiecePaper>
    );
};

export default CanvasStage;