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
    handleDragMove:any;
    draggable?: boolean;
}

const TextInput = ({ textInputObj, handleDragStart, handleDragEnd, isSelected, onSelect, onTransformEnd,handleDragMove,  draggable = true }: TextInputProps) => {
    const shapeRef = useRef<Konva.Group>(null);
    const trRef = useRef<Konva.Transformer>(null);

    useEffect(() => {
        if (isSelected && shapeRef.current) {
            // we need to attach transformer manually
            trRef.current?.nodes([shapeRef.current]);
            trRef.current?.getLayer()?.batchDraw();
        }
    }, [isSelected]);

    const getIndicator = () => {
        switch (textInputObj.format) {
            case 'currency':
                return '$';
            case 'number':
                return '#';
            case 'date':
                return '📅';
            case 'email':
                return '@';
            case 'phone':
                return '📞';
            case 'paragraph':
                return '¶';
            default:
                return '';
        }
    };

    const isParagraph = textInputObj.format === 'paragraph';
    const containerWidth = isParagraph ? textInputObj.fontSize * 15 : textInputObj.fontSize * 10;
    const containerHeight = isParagraph ? textInputObj.fontSize * 4 : textInputObj.fontSize * 2;
    const fontWidth = textInputObj.displayName.length * 10;

    const getAlignment = () => {
        switch (textInputObj.align) {
            case 'left':
                return 5;
            case 'right':
                return (containerWidth - 25) - (fontWidth);
            case 'center':
                return (containerWidth / 2) - (fontWidth / 2);
            default:
                return 5;
        }
    };

    return (
        <React.Fragment>
            <Group
                key={textInputObj.id}
                id={textInputObj.id}
                displayName={textInputObj.displayName}
                x={textInputObj.x}
                y={textInputObj.y}
                draggable = {draggable}
                onDragMove={handleDragMove}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                ref={shapeRef}
                rotation={textInputObj.rotation}
                onClick={onSelect}
                onTap={onSelect}
            >
                <TextInputContainer
                    width={containerWidth}
                    height={containerHeight}
                    fill='#F5F5F5'
                    scaleX={1}
                    scaleY={1}                />
                <Text
                    x={getAlignment()}
                    y={5}
                    text={`${textInputObj.displayName}`}
                    fontSize={16}
                    fill={textInputObj.fill}
                    scaleX={1}
                    scaleY={1}                />
                <Text
                    x={containerWidth - 20}
                    y={5}
                    text={getIndicator()}
                    fontSize={16}
                    fill={'gray'}
                    scaleX={1}
                    scaleY={1}                />
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