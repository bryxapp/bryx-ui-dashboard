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
    handleDragMove: any;
    draggable?: boolean;
}

const TextInput = ({ textInputObj, handleDragStart, handleDragEnd, isSelected, onSelect, onTransformEnd, handleDragMove, draggable = true }: TextInputProps) => {
    const shapeRef = useRef<Konva.Group>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const createTempTextKonvaShape = (content: TextInputObj) => new Konva.Text({
        text: content.displayName,
        fontSize: content.fontSize,
        fontFamily: content.fontFamily,
        fontStyle: content.fontStyle,
        textDecoration: content.textDecoration,
        align: content.align,
    });

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

    const tempTextShape = createTempTextKonvaShape(textInputObj);

    const textWidth = tempTextShape.width();
    const textHeight = tempTextShape.height();
    const containerWidth = textWidth + textWidth * .25;
    const containerHeight = textHeight + textHeight * .25;

    const getXAlignment = () => {
        switch (textInputObj.align) {
            case 'left':
                return 5;
            case 'center':
                return (containerWidth - textWidth) / 2;
            case 'right':
                return 5 + (containerWidth - textWidth) - 5;
            default:
                return 5;
        }
    };

    const getYAlignment = () => {
        return (containerHeight - textHeight) / 2;
    }

    return (
        <React.Fragment>
            <Group
                key={textInputObj.id}
                id={textInputObj.id}
                displayName={textInputObj.displayName}
                x={textInputObj.x}
                y={textInputObj.y}
                draggable={draggable}
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
                    scaleY={1} />
                <Text
                    x={getXAlignment()}
                    y={getYAlignment()}
                    text={`${textInputObj.displayName}`}
                    fontSize={textInputObj.fontSize}
                    fill={textInputObj.fill}
                    fontFamily={textInputObj.fontFamily}
                    fontStyle={textInputObj.fontStyle}
                    scaleX={1}
                    scaleY={1} />
                <Text
                    x={containerWidth - textWidth * .22}
                    y={5}
                    text={getIndicator()}
                    fontSize={textInputObj.fontSize * .6}
                    fill={'gray'}
                    scaleX={1}
                    scaleY={1} />
            </Group>
            {isSelected && !textInputObj.isNestedInTextTable &&(
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
                    resizeEnabled={true}
                    keepRatio={false}
                />
            )}
        </React.Fragment>
    );
};

export default TextInput;