import { Rect, Text, Group, Transformer } from 'react-konva';
import { styled } from '@mui/material/styles';
import { TextInputObj } from '../../../../utils/types/CanvasInterfaces';
import React, { useRef, useEffect } from 'react';
import Konva from 'konva';

const TextInputContainer = styled(Rect)({
    borderRadius: '4px',
    border: '1px solid #C4C4C4',
    padding: '12px'
});

interface TextInputProps {
    textInputObj: TextInputObj;
    handleDragStart: any;
    handleDragEnd: any;
    isSelected: boolean;
    onSelect: any;
    onTransformEnd: any;
}

const TextInput = ({ textInputObj, handleDragStart, handleDragEnd, isSelected, onSelect, onTransformEnd }: TextInputProps) => {
    const shapeRef = useRef<Konva.Group>(null);
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
            <Group
                key={textInputObj.id}
                id={textInputObj.id}
                displayName={textInputObj.displayName}
                x={textInputObj.x}
                y={textInputObj.y}
                draggable
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                ref={shapeRef}
                rotation={textInputObj.rotation}
                onClick={onSelect}
                onTap={onSelect}
            >
                <TextInputContainer
                    width={textInputObj.fontSize * 10}
                    height={textInputObj.fontSize * 2}
                    fill='#F5F5F5'
                    scaleX={textInputObj.isDragging ? 1.1 : 1}
                    scaleY={textInputObj.isDragging ? 1.1 : 1}
                />
                <Text
                    x={5}
                    y={5}
                    text={`${textInputObj.displayName}`}
                    fontSize={12}
                    fill={textInputObj.fill}
                    scaleX={textInputObj.isDragging ? 1.1 : 1}
                    scaleY={textInputObj.isDragging ? 1.1 : 1}
                />
            </Group>
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
                    rotateEnabled={true}
                    anchorSize={10}
                    resizeEnabled={false}
                    keepRatio={false}
                />
            )}
        </React.Fragment>
    );
};

export default TextInput;