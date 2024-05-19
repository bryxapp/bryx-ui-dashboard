import React, { useEffect, useRef } from 'react';
import { Rect } from 'react-konva';
import Konva from 'konva';
import { RectangleObj } from '../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import ShapeTransformer from '../SharedShapeComponents/ShapeTransformer';
import useShapeMove from '../../useShapeMove';

interface RectangleShapeProps {
    rectangleObj: RectangleObj;
}

const RectangleShape = ({ rectangleObj}: RectangleShapeProps) => {
    const { canvasDesign, setCanvasDesign, selectedId, setSelectedId } = useCanvasDesignContext();
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

    const { handleDragEnd, onTransformEnd, handleDragMove } = useShapeMove(setCanvasDesign, canvasDesign);

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
                scaleX={1}
                scaleY={1}
                rotation={rectangleObj.rotation}
                onDragEnd={handleDragEnd}
                onDragMove={handleDragMove}
                cornerRadius={rectangleObj.cornerRadius ? rectangleObj.cornerRadius : 0}
                draggable
            />
            {isSelected && (
                <>
                    <ShapeTransformer
                        shapeObj={rectangleObj}
                        trRef={trRef}
                        onTransformEnd={onTransformEnd}
                    />
                </>
            )}
        </React.Fragment>
    )
};

export default RectangleShape;