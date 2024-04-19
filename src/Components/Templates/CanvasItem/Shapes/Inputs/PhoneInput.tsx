import { Rect, Group } from 'react-konva';
import { PhoneInputObj } from '../../../../../utils/types/CanvasInterfaces';
import React, { useRef, useEffect } from 'react';
import Konva from 'konva';
import InputContent from './SharedInputComponents/InputContent';
import InputLabel from './SharedInputComponents/InputLabel';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import ShapeTransformer from '../SharedShapeComponents/ShapeTransformer';
import { getTextWidthAndHeight } from '../../../../../utils/shapeManagementUtils';

const PHONE_NUMBER_LENGTH = 10;
interface PhoneInputProps {
    phoneInputObj: PhoneInputObj;
    handleDragEnd: any;
    onTransformEnd: any;
    handleDragMove: any;
    draggable?: boolean;
}

const PhoneInput = ({ phoneInputObj, handleDragEnd, onTransformEnd, handleDragMove, draggable = true }: PhoneInputProps) => {
    const shapeRef = useRef<Konva.Group>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const { selectedId, setSelectedId } = useCanvasDesignContext();
    const isSelected = phoneInputObj.id === selectedId;
    const onSelect = () => {
        setSelectedId(phoneInputObj.id);
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
    }, [phoneInputObj, isSelected]);

    const [labelShapeWidth, labelShapeHeight] = getTextWidthAndHeight(phoneInputObj.label);
    const [contentShapeWidth, contentShapeHeight] = getTextWidthAndHeight(phoneInputObj.content, 'X'.repeat(PHONE_NUMBER_LENGTH));
    const containerHeight = phoneInputObj.hasLabel ? contentShapeHeight + labelShapeHeight : contentShapeHeight;
    const containerWidth = Math.max(labelShapeWidth, contentShapeWidth);

    return (
        <React.Fragment>
            <Group
                key={phoneInputObj.id}
                id={phoneInputObj.id}
                displayName={phoneInputObj.label}
                x={phoneInputObj.x}
                y={phoneInputObj.y}
                draggable={draggable}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
                ref={shapeRef}
                rotation={phoneInputObj.rotation}
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
                {phoneInputObj.hasLabel && (
                    <InputLabel textObj={phoneInputObj.label} contentHeight={contentShapeHeight} containerWidth={containerWidth} inputObjId={phoneInputObj.id}/>
                )}
                {/* Input Content */}
                <InputContent
                    textObj={phoneInputObj.content}
                    containerWidth={containerWidth}
                    contentHeight={contentShapeHeight}
                    contentWidth={contentShapeWidth}
                    labelHeight={phoneInputObj.hasLabel ? labelShapeHeight : 0}
                    labelFontSize={phoneInputObj.hasLabel ? phoneInputObj.label.fontSize : 0}
                    onSelect={onSelect} />
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

export default PhoneInput;