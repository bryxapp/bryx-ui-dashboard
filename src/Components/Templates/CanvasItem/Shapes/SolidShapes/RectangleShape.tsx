import React, { useEffect, useRef } from 'react';
import { Rect, Transformer } from 'react-konva';
import Konva from 'konva';
import { RectangleObj } from '../../../../../utils/types/CanvasInterfaces';
import { Html } from 'react-konva-utils';
import DeleteButton from '../../CanvasToolbar/DeleteButton';
import ColorPicker from '../../CanvasToolbar/ColorPicker/ColorPicker';

interface RectangleShapeProps {
    rectangleObj: RectangleObj;
    canvasDesign: any;
    setCanvasDesign: any;
    handleDragStart: any;
    handleDragEnd: any;
    isSelected: boolean;
    onSelect: any;
    onTransformEnd: any;
    handleDragMove: any;
}

const RectangleShape = ({ rectangleObj, canvasDesign, setCanvasDesign, handleDragStart, handleDragEnd, isSelected, onSelect, onTransformEnd, handleDragMove }: RectangleShapeProps) => {
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
                    <Html>
                        <div
                            style={{
                                position: 'absolute',
                                left: `${rectangleObj.x + rectangleObj.width + 10}px`, // Adjusted to apply positioning
                                top: `${rectangleObj.y - 15}px`,
                                display: 'flex',
                                gap: '10px', // Adds space between child components
                                backgroundColor: '#F3F3F3', // Light gray background, similar to MS Word's menu
                                padding: '10px', // Adds some padding inside the container for spacing
                                borderRadius: '5px', // Rounded corners for a softer look
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
                                alignItems: 'center', // Ensures children are aligned in the center vertically
                                zIndex: 1000 // Ensures the menu appears above other content
                            }}
                        >
                            <ColorPicker solidShapeObj={rectangleObj} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign}/>
                            <DeleteButton canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                        </div>
                    </Html>
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
                </>
            )}
        </React.Fragment>
    )
};

export default RectangleShape;