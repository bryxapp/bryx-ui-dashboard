import React, { useEffect, useRef } from 'react';
import { Rect, Transformer } from 'react-konva';
import Konva from 'konva';

const RectangleShape = ({ rectangleObj, handleDragStart, handleDragEnd, isSelected, onSelect, onTransformEnd }: any) => {
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
                id={rectangleObj.id}
                x={rectangleObj.x}
                y={rectangleObj.y}
                width={rectangleObj.width}
                height={rectangleObj.height}
                fill={rectangleObj.fill}
                scaleX={rectangleObj.isDragging ? 1.1 : 1}
                scaleY={rectangleObj.isDragging ? 1.1 : 1}
                rotation={rectangleObj.rotation}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
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

export default RectangleShape;