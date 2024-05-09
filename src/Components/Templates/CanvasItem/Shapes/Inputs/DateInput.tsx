import { Rect, Group } from 'react-konva';
import { DateInputObj } from '../../../../../utils/types/CanvasInterfaces';
import React, { useRef, useEffect } from 'react';
import Konva from 'konva';
import InputContent from './SharedInputComponents/InputContent';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import ShapeTransformer from '../SharedShapeComponents/ShapeTransformer';
import { format } from 'date-fns';
import { getTextWidthAndHeight } from '../../../../../utils/shapeManagementUtils';

interface DateInputProps {
    dateInputObj: DateInputObj;
    handleDragEnd: any;
    onTransformEnd: any;
    handleDragMove: any;
    draggable?: boolean;
}

const DateInput = ({ dateInputObj, handleDragEnd, onTransformEnd, handleDragMove, draggable = true }: DateInputProps) => {
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

    const formattedDate = format(new Date(), dateInputObj.dateFormat);
    const [contentShapeWidth, contentShapeHeight] = getTextWidthAndHeight(dateInputObj, formattedDate);
    const containerHeight = contentShapeHeight;
    const containerWidth =  contentShapeWidth;
    dateInputObj.value = formattedDate;
    return (
        <React.Fragment>
            <Group
                key={dateInputObj.id}
                id={dateInputObj.id}
                displayName={dateInputObj.value}
                x={dateInputObj.x}
                y={dateInputObj.y}
                draggable={draggable}
                onDragMove={handleDragMove}
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
                {/* Input Content */}
                <InputContent
                    inputObj={dateInputObj}
                    containerWidth={containerWidth}
                    inputHeight={contentShapeHeight}
                    inputWidth = {contentShapeWidth}
                    contentHeight={contentShapeHeight}
                    contentWidth={contentShapeWidth} />
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