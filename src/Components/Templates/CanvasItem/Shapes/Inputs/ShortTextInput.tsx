import { Rect, Group } from 'react-konva';
import { ShortTextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import React, { useRef, useEffect } from 'react';
import Konva from 'konva';
import InputLabel from './SharedInputComponents/InputLabel';
import InputContent from './SharedInputComponents/InputContent';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import ShapeTransformer from '../SharedShapeComponents/ShapeTransformer';
import { getTextWidthAndHeight } from '../../../../../utils/shapeManagementUtils';

interface ShortTextInputProps {
    shortTextInputObj: ShortTextInputObj;
    handleDragEnd: any;
    onTransformEnd: any;
    handleDragMove: any;
    draggable?: boolean;
}

const ShortTextInput = ({ shortTextInputObj, handleDragEnd, onTransformEnd, handleDragMove, draggable = true }: ShortTextInputProps) => {
    const shapeRef = useRef<Konva.Group>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const { selectedId, setSelectedId } = useCanvasDesignContext();
    const isSelected = shortTextInputObj.id === selectedId;
    const onSelect = () => {
        setSelectedId(shortTextInputObj.id);
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
        // This is necessary to update the transformer's nodes when the shape is selected.
        if (shapeRef.current && trRef.current && isSelected) {
            const shapeRefCurrent = shapeRef.current;
            trRef.current.nodes([shapeRefCurrent]);
            trRef.current.getLayer()?.batchDraw();
        }
    }, [shortTextInputObj.content, shortTextInputObj.label, shortTextInputObj.hasLabel, isSelected]);

    const [labelShapeWidth, labelShapeHeight] = getTextWidthAndHeight(shortTextInputObj.label, shortTextInputObj.label.value);
    const [contentShapeWidth, contentShapeHeight] = getTextWidthAndHeight(shortTextInputObj.content, shortTextInputObj.content.value);
    const containerHeight = shortTextInputObj.hasLabel ? contentShapeHeight + labelShapeHeight : contentShapeHeight;
    const containerWidth = Math.max(labelShapeWidth, contentShapeWidth, shortTextInputObj.inputWidth);

    return (
        <React.Fragment>
            <Group
                key={shortTextInputObj.id}
                id={shortTextInputObj.id}
                displayName={shortTextInputObj.label}
                x={shortTextInputObj.x}
                y={shortTextInputObj.y}
                draggable={draggable}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
                ref={shapeRef}
                rotation={shortTextInputObj.rotation}
                onClick={onSelect}
                onTap={onSelect}
                width={containerWidth}
                height={containerHeight}
            >
                {/* Background Rectangle for easier selecting and dragging */}
                <Rect
                    width={containerWidth}
                    height={containerHeight - labelShapeHeight}
                    fill='transparent'
                    onClick={onSelect}
                    onTap={onSelect} />

                {/* Input Label */}
                {shortTextInputObj.hasLabel && (
                    <InputLabel inputLabelObj={shortTextInputObj.label} contentHeight={contentShapeHeight} containerWidth={containerWidth} inputObjId={shortTextInputObj.id} />
                )}
                {/* Input Content */}
                <InputContent
                    inputObj={shortTextInputObj}
                    containerWidth={containerWidth}
                    inputHeight={contentShapeHeight}
                    inputWidth={shortTextInputObj.inputWidth}
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

export default ShortTextInput;