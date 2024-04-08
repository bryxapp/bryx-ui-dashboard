import React, { useEffect, useRef } from 'react';
import { Rect } from 'react-konva';
import Konva from 'konva';
import { RectangleObj } from '../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import ShapePopUp from '../SharedShapeComponents/ShapePopUp';
import ShapeTransformer from '../SharedShapeComponents/ShapeTransformer';

interface RectangleShapeProps {
    rectangleObj: RectangleObj;
    handleDragStart: any;
    handleDragEnd: any;
    onTransformEnd: any;
    handleDragMove: any;
}

const RectangleShape = ({ rectangleObj, handleDragStart, handleDragEnd, onTransformEnd, handleDragMove }: RectangleShapeProps) => {
    const { selectedId, setSelectedId } = useCanvasDesignContext();
    const isSelected = rectangleObj.id === selectedId;
    const shapeRef = useRef<Konva.Rect>(null);
    const trRef = useRef<Konva.Transformer>(null);
    useEffect(() => {
        if (isSelected && shapeRef.current) {
            // we need to attach transformer manually
            trRef.current?.nodes([shapeRef.current]);
            trRef.current?.getLayer()?.batchDraw();
        }
    }, [isSelected]);

    const onSelect = () => {
        setSelectedId(rectangleObj.id);
    }

    return (
        <React.Fragment>
            <Rect
                onClick={() => { setSelectedId(rectangleObj.id); }}
                onTap={onSelect}
                ref={shapeRef}
                id={rectangleObj.id}
                x={rectangleObj.x}
                y={rectangleObj.y}
                width={rectangleObj.width}
                height={rectangleObj.height}
                fill={rectangleObj.fill}
                stroke={rectangleObj.stroke}
                strokeWidth={rectangleObj.strokeWidth}
                scaleX={rectangleObj.isDragging ? 1.0 : 1}
                scaleY={rectangleObj.isDragging ? 1.0 : 1}
                rotation={rectangleObj.rotation}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragMove={handleDragMove}
                cornerRadius={rectangleObj.cornerRadius ? rectangleObj.cornerRadius : 0}
                draggable
            />
            {isSelected && (
                <>
                    <ShapePopUp shapeObj={rectangleObj} width={rectangleObj.width} />
                    <ShapeTransformer
                        trRef={trRef}
                        onTransformEnd={onTransformEnd}
                        rotationEnabled={true}
                        resizeEnabled={true}
                        keepRatio={false}
                    />
                </>
            )}
        </React.Fragment>
    )
};

export default RectangleShape;