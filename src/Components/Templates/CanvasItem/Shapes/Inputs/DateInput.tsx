import { Rect, Group } from 'react-konva';
import { DateInputObj } from '../../../../../utils/types/CanvasInterfaces';
import React, { useRef, useEffect } from 'react';
import Konva from 'konva';
import InputContent from './SharedInputComponents/InputContent';
import { createTempTextKonvaShape } from './SharedInputComponents/InputHelper';
import InputLabel from './SharedInputComponents/InputLabel';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import ShapeTransformer from '../SharedShapeComponents/ShapeTransformer';

interface DateInputProps {
    dateInputObj: DateInputObj;
    handleDragStart: any;
    handleDragEnd: any;
    onTransformEnd: any;
    handleDragMove: any;
    draggable?: boolean;
}

const DateInput = ({ dateInputObj, handleDragStart, handleDragEnd, onTransformEnd, handleDragMove, draggable = true }: DateInputProps) => {
    const { selectedId, setSelectedId } = useCanvasDesignContext();
    const isSelected = dateInputObj.id === selectedId;
    const onSelect = () => {
        setSelectedId(dateInputObj.id);
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
    }, [dateInputObj, isSelected]);

    //Create Label Text Shape for measurements
    const tempTextShapeLabel = createTempTextKonvaShape(dateInputObj.label);
    const labelShapeWidth = tempTextShapeLabel.width();
    const labelShapeHeight = tempTextShapeLabel.height();

    //Create Content Text Shape for measurements

    const tempTextShapeContent = createTempTextKonvaShape(dateInputObj.content);
    const contentShapeWidth = tempTextShapeContent.width();
    const contentShapeHeight = tempTextShapeContent.height();

    const containerHeight = dateInputObj.hasLabel ? contentShapeHeight + labelShapeHeight : contentShapeHeight;
    const containerWidth = dateInputObj.hasLabel ? Math.max(labelShapeWidth, contentShapeWidth) : contentShapeWidth;

    return (
        <React.Fragment>
            <Group
                key={dateInputObj.id}
                id={dateInputObj.id}
                displayName={dateInputObj.label}
                x={dateInputObj.x}
                y={dateInputObj.y}
                draggable={draggable}
                onDragMove={handleDragMove}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                ref={shapeRef}
                rotation={dateInputObj.rotation}
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
                {/* Input Label */}
                {dateInputObj.hasLabel && (
                    <InputLabel textObj={dateInputObj.label} contentHeight={contentShapeHeight} containerWidth={containerWidth} inputObjId={dateInputObj.id} />
                )}
                {/* Input Content */}
                <InputContent
                    textObj={dateInputObj.content}
                    containerWidth={containerWidth}
                    contentHeight={contentShapeHeight}
                    contentWidth={contentShapeWidth}
                    labelHeight={dateInputObj.hasLabel ? labelShapeHeight : 0}
                    labelFontSize={dateInputObj.hasLabel ? dateInputObj.label.fontSize : 0}
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

export default DateInput;