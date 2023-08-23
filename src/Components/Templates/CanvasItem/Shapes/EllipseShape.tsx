import React, { useEffect, useRef } from 'react';
import Konva from 'konva';
import { Ellipse, Transformer } from 'react-konva';
import { EllipseObj } from '../../../../utils/types/CanvasInterfaces';

interface EllipseShapeProps {
    ellipseObj: EllipseObj;
    handleDragStart: (e: any) => void;
    handleDragEnd: (e: any) => void;
    isSelected: boolean;
    onSelect: () => void;
    onTransformEnd: (e: any) => void;
    handleDragMove:any;
}

const EllipseShape = ({
    ellipseObj,
    handleDragStart,
    handleDragEnd,
    isSelected,
    onSelect,
    onTransformEnd,
    handleDragMove
}: EllipseShapeProps) => {
    const shapeRef = useRef<Konva.Ellipse>(null);
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
            <Ellipse
                id={ellipseObj.id}
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                x={ellipseObj.x}
                y={ellipseObj.y}
                radiusX={ellipseObj.radiusX}
                radiusY={ellipseObj.radiusY}
                fill={ellipseObj.fill}
                scaleX={1}
                scaleY={1}
                rotation={ellipseObj.rotation}
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
    );
};

export default EllipseShape;
