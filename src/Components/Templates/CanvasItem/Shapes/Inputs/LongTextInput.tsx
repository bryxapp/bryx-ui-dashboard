import { Rect, Group } from 'react-konva';
import { LongTextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import React, { useRef, useEffect } from 'react';
import Konva from 'konva';
import InputLabel from './SharedInputComponents/InputLabel';
import InputContent from './SharedInputComponents/InputContent';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import ShapeTransformer from '../SharedShapeComponents/ShapeTransformer';
import { getTextWidthAndHeight } from '../../../../../utils/shapeManagementUtils';
import { createTempTextKonvaShape } from './SharedInputComponents/InputHelper';

interface LongTextInputProps {
    longTextInputObj: LongTextInputObj;
    handleDragEnd: any;
    onTransformEnd: any;
    handleDragMove: any;
    draggable?: boolean;
}

const LongTextInput = ({ longTextInputObj, handleDragEnd, onTransformEnd, handleDragMove, draggable = true }: LongTextInputProps) => {
    const shapeRef = useRef<Konva.Group>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const { selectedId, setSelectedId } = useCanvasDesignContext();
    const isSelected = longTextInputObj.id === selectedId;
    const onSelect = () => {
        setSelectedId(longTextInputObj.id);
    }

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
    }, [longTextInputObj, isSelected]);

    //Create Label Text Shape for measurements
    const [labelShapeWidth, labelShapeHeight] = getTextWidthAndHeight(longTextInputObj.label, longTextInputObj.label.value);

    //Create Content Text Shape for measurements
    const tempTextShapeContent = createTempTextKonvaShape(longTextInputObj.content, longTextInputObj.content.value);
    const contentShapeWidth = Math.max(tempTextShapeContent.width(), longTextInputObj.inputWidth);
    const contentShapeHeight = Math.max(tempTextShapeContent.height(), longTextInputObj.inputHeight);

    const containerHeight = longTextInputObj.hasLabel ? contentShapeHeight + labelShapeHeight : contentShapeHeight;
    const containerWidth = Math.max(labelShapeWidth, contentShapeWidth, longTextInputObj.inputWidth);

    return (
        <React.Fragment>
            <Group
                key={longTextInputObj.id}
                id={longTextInputObj.id}
                displayName={longTextInputObj.label}
                x={longTextInputObj.x}
                y={longTextInputObj.y}
                draggable={draggable}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
                ref={shapeRef}
                rotation={longTextInputObj.rotation}
                onClick={onSelect}
                onTap={onSelect}
            >
                {/* Background Rectangle for easier selecting and dragging */}
                <Rect
                    width={containerWidth}
                    height={containerHeight - labelShapeHeight}
                    fill='transparent'
                    onClick={onSelect}
                    onTap={onSelect} />

                {/* Input Label */}
                {longTextInputObj.hasLabel && (
                    <InputLabel inputLabelObj={longTextInputObj.label} contentHeight={contentShapeHeight} containerWidth={containerWidth} inputObjId={longTextInputObj.id}/>
                )}
                {/* Input Content */}
                <InputContent
                    inputObj={longTextInputObj}
                    containerWidth={containerWidth}
                    inputHeight={longTextInputObj.inputHeight}
                    inputWidth={longTextInputObj.inputWidth}
                    contentHeight={contentShapeHeight}
                    contentWidth={contentShapeWidth}
                    labelHeight={labelShapeHeight} />
            </Group>
            {isSelected && (
                <>
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

export default LongTextInput;