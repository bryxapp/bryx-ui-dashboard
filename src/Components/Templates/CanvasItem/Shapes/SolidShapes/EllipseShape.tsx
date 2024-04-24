import React, { useEffect, useRef } from 'react';
import Konva from 'konva';
import { Ellipse } from 'react-konva';
import { EllipseObj } from '../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import ShapeTransformer from '../SharedShapeComponents/ShapeTransformer';

interface EllipseShapeProps {
    ellipseObj: EllipseObj;
    handleDragEnd: (e: any) => void;
    onTransformEnd: (e: any) => void;
    handleDragMove: any;
}

const EllipseShape = ({
    ellipseObj,
    handleDragEnd,
    onTransformEnd,
    handleDragMove
}: EllipseShapeProps) => {

    const shapeRef = useRef<Konva.Ellipse>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const { selectedId, setSelectedId } = useCanvasDesignContext();
    const isSelected = ellipseObj.id === selectedId;
    const onSelect = () => {
        setSelectedId(ellipseObj.id);
    }

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
                onDragEnd={handleDragEnd}
                draggable
            />
            {isSelected && (
                <>
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
    );
};

export default EllipseShape;
