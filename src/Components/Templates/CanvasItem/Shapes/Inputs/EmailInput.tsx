import { Rect, Group } from 'react-konva';
import { EmailInputObj } from '../../../../../utils/types/CanvasInterfaces';
import React, { useRef, useEffect } from 'react';
import Konva from 'konva';
import InputContent from './SharedInputComponents/InputContent';
import { createTempTextKonvaShape } from './SharedInputComponents/InputHelper';
import InputLabel from './SharedInputComponents/InputLabel';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import EditMenu from '../EditMenu/EditMenu';
import ShapeTransformer from '../ShapeTransformer';

interface EmailInputProps {
    emailInputObj: EmailInputObj;
    handleDragStart: any;
    handleDragEnd: any;
    onTransformEnd: any;
    handleDragMove: any;
    draggable?: boolean;
}

const EmailInput = ({ emailInputObj, handleDragStart, handleDragEnd, onTransformEnd, handleDragMove, draggable = true }: EmailInputProps) => {
    const { selectedId, setSelectedId } = useCanvasDesignContext();
    const isSelected = emailInputObj.id === selectedId;
    const onSelect = () => {
        setSelectedId(emailInputObj.id);
    }
    const shapeRef = useRef<Konva.Group>(null);
    const trRef = useRef<Konva.Transformer>(null);

    useEffect(() => {
        if (isSelected && shapeRef.current) {
            // we need to attach transformer manually
            trRef.current?.nodes([shapeRef.current]);
            trRef.current?.getLayer()?.batchDraw();
        }
    }, [isSelected]);

    useEffect(() => {
        // This effect will re-run whenever shortTextInputObj changes.
        if (shapeRef.current && trRef.current) {
            // Directly update the size of the Konva elements based on the new shortTextInputObj properties.
            // You might want to recalculate your sizes here similar to what is done outside useEffect.
            // Then, update the transformer if it is selected.
            if (isSelected) {
                trRef.current.nodes([shapeRef.current]);
                trRef.current.getLayer()?.batchDraw();
            }
        }
    }, [emailInputObj, isSelected]);

    //Create Label Text Shape for measurements
    const tempTextShapeLabel = createTempTextKonvaShape(emailInputObj.label);
    const labelShapeWidth = tempTextShapeLabel.width();
    const labelShapeHeight = tempTextShapeLabel.height();

    //Create Content Text Shape for measurements

    const tempTextShapeContent = createTempTextKonvaShape(emailInputObj.content);
    const contentShapeWidth = tempTextShapeContent.width();
    const contentShapeHeight = tempTextShapeContent.height();

    const containerHeight = emailInputObj.hasLabel ? contentShapeHeight + labelShapeHeight : contentShapeHeight;
    const containerWidth = Math.max(labelShapeWidth, contentShapeWidth);

    return (
        <React.Fragment>
            <Group
                key={emailInputObj.id}
                id={emailInputObj.id}
                displayName={emailInputObj.label}
                x={emailInputObj.x}
                y={emailInputObj.y}
                draggable={draggable}
                onDragMove={handleDragMove}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                ref={shapeRef}
                rotation={emailInputObj.rotation}
                onClick={onSelect}
                onTap={onSelect}
            >
                {/* Background Rectangle for easier selecting and dragging */}
                <Rect
                    width={containerWidth + 10}
                    height={containerHeight}
                    fill='transparent'
                    onClick={onSelect}
                    onTap={onSelect} />
                {/* Input Label */}
                {emailInputObj.hasLabel && (
                    <InputLabel textObj={emailInputObj.label} contentHeight={contentShapeHeight} containerWidth={containerWidth} />
                )}
                {/* Input Content */}
                <InputContent
                    textObj={emailInputObj.content}
                    containerWidth={containerWidth}
                    contentHeight={contentShapeHeight}
                    contentWidth={contentShapeWidth}
                    labelHeight={labelShapeHeight}
                    labelFontSize={emailInputObj.label.fontSize}
                    onSelect={onSelect} />
            </Group>
            {isSelected && (
                <>
                    <EditMenu shapeObj={emailInputObj} width={containerWidth} />
                    <ShapeTransformer
                        trRef={trRef}
                        onTransformEnd={onTransformEnd}
                        rotationEnabled={true}
                        resizeEnabled={false}
                        keepRatio={true}
                    />
                </>
            )}
        </React.Fragment>
    );
};

export default EmailInput;