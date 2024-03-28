import { useState } from 'react';
import { Stage, Layer } from 'react-konva';
import styled from '@emotion/styled';
import { ShapeObj, CanvasDesignData, ShapeColor } from '../../../../utils/types/CanvasInterfaces';
import { CanvasStarterData } from '../../../../utils/types/CanvasInterfaces';
import { CanvasStarters } from '../../../../utils/canvas-starters';
import { useCanvasKeyboardShortcuts } from '../useCanvasKeyboardShortcuts';
import ShapeRenderer from './ShapeRenderer';
import { getWebCanvasDimensions } from '../../../../utils/canvasUtils';
import { selectShape } from '../../../../utils/shapeManagementUtils';

const PiecePaper = styled('div')<{ pageWidth: string | number; pageHeight: string | number }>((props) => ({
    width: props.pageWidth,
    height: props.pageHeight,
    boxShadow: '0 0 0.5in -0.25in rgba(0,0,0,0.5)',
    borderRadius: '0.25in',
    margin: 'auto',
    overflow: 'hidden',
    backgroundColor: 'white',
}));
interface CanvasStageProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: any;
    color: ShapeColor;
    setColor: any;
}


const CanvasStage = ({ canvasDesign, setCanvasDesign, setColor }: CanvasStageProps) => {
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

    useCanvasKeyboardShortcuts({ canvasDesign, setCanvasDesign, copiedObject, setCopiedObject });

    const checkDeselect = (e: any) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null, canvasDesign, setCanvasDesign);
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
                <Layer>
                    {/* Place all shapes on the canvas */}
                    <ShapeRenderer pageWidth={pageWidth} pageHeight={pageHeight} setCanvasDesign={setCanvasDesign} canvasDesign={canvasDesign} setColor={setColor} />
                </Layer>
            </Stage>
        </PiecePaper>
    );
};

export default CanvasStage;