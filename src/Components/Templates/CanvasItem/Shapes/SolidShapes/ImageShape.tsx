import React, { useEffect, useRef } from 'react';
import Konva from 'konva';
import { Image } from 'react-konva';
import { ImageObj } from '../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import ShapeTransformer from '../SharedShapeComponents/ShapeTransformer';

interface ImageShapeProps {
    imageObj: ImageObj;
    handleDragStart: (e: any) => void;
    handleDragEnd: (e: any) => void;
    onTransformEnd: (e: any) => void;
    handleDragMove: any;
}

const ImageShape = ({
    imageObj,
    handleDragStart,
    handleDragEnd,
    onTransformEnd,
    handleDragMove
}: ImageShapeProps) => {
    const shapeRef = useRef<Konva.Image>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const { selectedId, setSelectedId } = useCanvasDesignContext();
    const isSelected = imageObj.id === selectedId;
    const onSelect = () => {
        setSelectedId(imageObj.id);
    }

    useEffect(() => {
        if (isSelected && shapeRef.current) {
            // we need to attach transformer manually
            trRef.current?.nodes([shapeRef.current]);
            trRef.current?.getLayer()?.batchDraw();
        }
    }, [isSelected]);

    const image = new window.Image();
    image.src = imageObj.src;
    image.onload = () => {
        shapeRef.current?.image(image);
        shapeRef.current?.getLayer()?.batchDraw();
    };


    return (
        <React.Fragment>
            <Image
                id={imageObj.id}
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                x={imageObj.x}
                y={imageObj.y}
                width={imageObj.width}
                height={imageObj.height}
                scaleX={1}
                scaleY={1}
                rotation={imageObj.rotation}
                onDragMove={handleDragMove}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                draggable
                image={image}
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

export default ImageShape;
