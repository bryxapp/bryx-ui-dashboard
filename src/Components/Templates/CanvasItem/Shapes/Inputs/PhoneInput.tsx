import { Rect, Group } from 'react-konva';
import { PhoneInputObj } from '../../../../../utils/types/CanvasInterfaces';
import React, { useRef, useEffect } from 'react';
import Konva from 'konva';
import { createTempTextKonvaShape } from './SharedInputComponents/InputHelper';
import InputContent from './SharedInputComponents/InputContent';
import InputLabel from './SharedInputComponents/InputLabel';
import InputTransformer from './SharedInputComponents/InputTransformer';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import EditMenu from '../EditMenu';

interface PhoneInputProps {
    phoneInputObj: PhoneInputObj;
    handleDragStart: any;
    handleDragEnd: any;
    onTransformEnd: any;
    handleDragMove: any;
    draggable?: boolean;
}

const PhoneInput = ({ phoneInputObj, handleDragStart, handleDragEnd, onTransformEnd, handleDragMove, draggable = true }: PhoneInputProps) => {
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

    //Create Label Text Shape for measurements
    const tempTextShapeLabel = createTempTextKonvaShape(phoneInputObj.label);
    const labelShapeWidth = tempTextShapeLabel.width();
    const labelShapeHeight = tempTextShapeLabel.height();

    //Create Content Text Shape for measurements

    const tempTextShapeContent = createTempTextKonvaShape(phoneInputObj.content);
    const contentShapeWidth = tempTextShapeContent.width();
    const contentShapeHeight = tempTextShapeContent.height();

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
                onDragStart={handleDragStart}
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
                    <InputLabel textObj={phoneInputObj.label} contentHeight={contentShapeHeight} containerWidth={containerWidth} />
                )}
                {/* Input Content */}
                <InputContent
                    textObj={phoneInputObj.content}
                    containerWidth={containerWidth}
                    contentHeight={contentShapeHeight}
                    contentWidth={contentShapeWidth}
                    labelHeight={labelShapeHeight}
                    labelFontSize={phoneInputObj.label.fontSize}
                    onSelect={onSelect} />
            </Group>
            {isSelected && (
                <>
                    <EditMenu shapeObj={phoneInputObj} width={containerWidth} />
                    <InputTransformer trRef={trRef} onTransformEnd={onTransformEnd} />
                </>

            )}
        </React.Fragment>
    );
};

export default PhoneInput;