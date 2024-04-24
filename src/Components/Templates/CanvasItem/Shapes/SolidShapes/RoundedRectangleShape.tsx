import React, { useEffect, useRef } from 'react';
import { Rect } from 'react-konva';
import Konva from 'konva';
import { RectangleObj } from '../../../../../utils/types/CanvasInterfaces';
import ShapeTransformer from '../SharedShapeComponents/ShapeTransformer';

interface RoundedRectangleShapeProps {
    roundedRectangleObj: RectangleObj;
    handleDragEnd: any;
    isSelected: boolean;
    onSelect: any;
    onTransformEnd: any;
    handleDragMove: any
}

const RoundedRectangleShape = ({ roundedRectangleObj, handleDragEnd, isSelected, onSelect, onTransformEnd, handleDragMove }: RoundedRectangleShapeProps) => {
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
                stroke={roundedRectangleObj.stroke}
                strokeWidth={roundedRectangleObj.strokeWidth}
                scaleX={1}
                scaleY={1}
                rotation={roundedRectangleObj.rotation}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
                cornerRadius={roundedRectangleObj.cornerRadius}
                draggable
            />
            {isSelected && (
                <ShapeTransformer
                    trRef={trRef}
                    onTransformEnd={onTransformEnd}
                    rotationEnabled={true}
                    resizeEnabled={true}
                    keepRatio={false}
                />
            )}
        </React.Fragment>
    )
};

export default RoundedRectangleShape;