
import React, { useEffect, useRef } from 'react';
import { Line, Transformer } from 'react-konva';
import Konva from 'konva';
import { LineObj } from '../../../../utils/types/CanvasInterfaces';

interface LineShapeProps {
    lineObj: LineObj;
    handleDragStart: any;
    handleDragEnd: any;
    isSelected: boolean;
    onSelect: any;
    onTransformEnd: any;
    handleDragMove:any;
}

const LineShape = ({ lineObj, handleDragStart, handleDragEnd, isSelected, onSelect, onTransformEnd,handleDragMove }: LineShapeProps) => {
    const shapeRef = useRef<Konva.Line>(null);
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
            <Line
                id={lineObj.id}
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                x={lineObj.x}
                y={lineObj.y}
                points={lineObj.points}
                stroke={lineObj.stroke}
                strokeWidth={lineObj.strokeWidth}
                scaleX={1}
                scaleY={1}
                rotation={lineObj.rotation}
                onDragMove={handleDragMove}
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

export default LineShape;