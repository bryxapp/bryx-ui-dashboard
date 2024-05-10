import { Rect, Group } from 'react-konva';
import { PhoneInputObj } from '../../../../../utils/types/CanvasInterfaces';
import React, { useRef, useEffect } from 'react';
import Konva from 'konva';
import InputContent from './SharedInputComponents/InputContent';
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

    const [contentShapeWidth, contentShapeHeight] = getTextWidthAndHeight(phoneInputObj, 'X'.repeat(PHONE_NUMBER_LENGTH));
    const containerHeight = contentShapeHeight;
    const containerWidth = contentShapeWidth;

    return (
        <React.Fragment>
            <Group
                key={phoneInputObj.id}
                id={phoneInputObj.id}
                displayName={phoneInputObj.value}
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
                    width={containerWidth}
                    height={containerHeight}
                    fill='transparent'
                    onClick={onSelect}
                    onTap={onSelect} />
                {/* Input Content */}
                <InputContent
                    inputObj={phoneInputObj}
                    containerWidth={containerWidth}
                    inputHeight={contentShapeHeight}
                    inputWidth={contentShapeWidth}
                    contentHeight={contentShapeHeight}
                    contentWidth={contentShapeWidth} />
            </Group>
            {isSelected && (
                <>
                    <ShapeTransformer
                        trRef={trRef}
                        onTransformEnd={onTransformEnd}
                        rotationEnabled={true}
                        horizontalResizeEnabled={false}
                        verticalResizeEnabled={false}
                    />
                </>

            )}
        </React.Fragment>
    );
};

export default PhoneInput;