import React, { useState } from 'react';
import { Stage, Layer } from 'react-konva';
import styled from '@emotion/styled';
import { getWebCanvasHeight, getWebCanvasWidth } from '../../../../utils/page-util';
import { EllipseObj, RectangleObj, TextInputObj, TextFieldObj, LineObj, ImageObj, ShapeObj, CanvasDesignData, ShapeColor } from '../../../../utils/types/CanvasInterfaces';
import { CanvasStarterData } from '../../../../utils/types/CanvasInterfaces';
import { CanvasStarters } from '../../../../utils/canvas-starters';
import { selectShape } from '../../../../utils/functions/CanvasFunctions';
import { useCanvasKeyboardShortcuts } from '../useCanvasKeyboardShortcuts';
import TextStyler from '../CanvasToolbar/TextStyler/TextStyler';
import ShapeRenderer from './ShapeRenderer';

//Page width and height is the same as the paper size. 8.5in x 11in
const pageWidth = getWebCanvasWidth();
const pageHeight = getWebCanvasHeight();

//Create a styled div to mimic the look of paper. White drop shadow and rounded corners.
const PiecePaper = styled('div')({
    width: pageWidth,
    height: pageHeight,
    boxShadow: '0 0 0.5in -0.25in rgba(0,0,0,0.5)',
    borderRadius: '0.25in',
    margin: 'auto',
    overflow: 'hidden',
    backgroundColor: 'white',
});

interface CanvasStageProps {
    canvasDesign: CanvasDesignData;
    setCanvasDesign: React.SetStateAction<any>;
    color: ShapeColor;
    setColor: React.SetStateAction<any>;
}

const CanvasStage = ({ canvasDesign, setCanvasDesign, setColor }: CanvasStageProps) => {

    //Parse url to get canvas starter name
    const urlParams = new URLSearchParams(window.location.search);
    const canvasStarterName = urlParams.get('canvasStarterName');

    if (canvasStarterName && canvasDesign.Shapes.length === 0) {
        const canvasStarter = CanvasStarters.find((canvasStarter: CanvasStarterData) => canvasStarter.name === canvasStarterName);
        if (canvasStarter) {
            setCanvasDesign(canvasStarter.canvasDesign);
        }
    }

    const [copiedObject, setCopiedObject] = useState<ShapeObj | RectangleObj | EllipseObj | LineObj | TextInputObj | TextFieldObj | ImageObj | null>(null);

    useCanvasKeyboardShortcuts({ canvasDesign, setCanvasDesign, copiedObject, setCopiedObject });

    const checkDeselect = (e: any) => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            selectShape(null, canvasDesign, setCanvasDesign);
        }
    };

    const isTextObjectSelected = canvasDesign.Shapes.find((shape: ShapeObj) => shape.id === canvasDesign.selectedId)?.type.includes('Text');
    const textObjectX = canvasDesign.Shapes.find((shape: ShapeObj) => shape.id === canvasDesign.selectedId)?.x;
    const textObjectY = canvasDesign.Shapes.find((shape: ShapeObj) => shape.id === canvasDesign.selectedId)?.y;

    return (
        <>
            {isTextObjectSelected && (
                <div style={{ position: 'absolute', left: (textObjectX ?? 0) - 100, top: (textObjectY ?? 0) - 10 }}>
                    <TextStyler canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                </div>
            )}
            <PiecePaper>
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
        </>
    );
};

export default CanvasStage;