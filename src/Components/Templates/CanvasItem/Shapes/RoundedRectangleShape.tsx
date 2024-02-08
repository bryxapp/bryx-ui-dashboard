import React, { useEffect, useRef } from 'react';
import { Rect, Transformer } from 'react-konva';
import Konva from 'konva';
import { RectangleObj } from '../../../../utils/types/CanvasInterfaces';

interface RoundedRectangleShapeProps {
    roundedRectangleObj: RectangleObj;
    handleDragStart: any;
    handleDragEnd: any;
    isSelected: boolean;
    onSelect: any;
    onTransformEnd: any;
    handleDragMove:any
}

const RoundedRectangleShape = ({ roundedRectangleObj, handleDragStart, handleDragEnd, isSelected, onSelect, onTransformEnd,handleDragMove }: RoundedRectangleShapeProps) => {
    const shapeRef = useRef<Konva.Rect>(null);
    const trRef = useRef<Konva.Transformer>(null);
    useEffect(() => {
        if (isSelected && shapeRef.current) {
            // we need to attach transformer manually
            trRef.current?.nodes([shapeRef.current]);
            trRef.current?.getLayer()?.batchDraw();
        }
    }, [isSelected]);

    return (
        <React.Fragment>
            <Rect
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                id={roundedRectangleObj.id}
                x={roundedRectangleObj.x}
                y={roundedRectangleObj.y}
                width={roundedRectangleObj.width}
                height={roundedRectangleObj.height}
                fill={roundedRectangleObj.fill}
                stroke = {roundedRectangleObj.stroke}
                strokeWidth={roundedRectangleObj.strokeWidth}
                scaleX={roundedRectangleObj.isDragging ? 1.0: 1}
                scaleY={roundedRectangleObj.isDragging ? 1.0: 1}
                rotation={roundedRectangleObj.rotation}
                onDragMove={handleDragMove}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                cornerRadius={roundedRectangleObj.cornerRadius}
                draggable
            />
            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                    onTransformEnd={onTransformEnd}
                />
            )}
        </React.Fragment>
    )
};

export default RoundedRectangleShape;