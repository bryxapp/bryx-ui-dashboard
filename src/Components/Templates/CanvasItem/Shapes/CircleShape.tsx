import React, { useEffect, useRef } from 'react';
import Konva from 'konva';
import { Circle, Transformer } from 'react-konva';
import { circleObj } from '../../../../utils/types/ShapeInterfaces';

interface CircleShapeProps {
    circleObj: circleObj;
    handleDragStart: (e: any) => void;
    handleDragEnd: (e: any) => void;
    isSelected: boolean;
    onSelect: () => void;
    onTransformEnd: (e: any) => void;
}

const CircleShape = ({
    circleObj,
    handleDragStart,
    handleDragEnd,
    isSelected,
    onSelect,
    onTransformEnd,
}: CircleShapeProps) => {
    const shapeRef = useRef<Konva.Circle>(null);
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
            <Circle
                id={circleObj.id}
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                x={circleObj.x}
                y={circleObj.y}
                radius={circleObj.radius}
                fill={circleObj.fill}
                scaleX={circleObj.isDragging ? 1.1 : 1}
                scaleY={circleObj.isDragging ? 1.1 : 1}
                rotation={circleObj.rotation}
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
    );
};

export default CircleShape;
