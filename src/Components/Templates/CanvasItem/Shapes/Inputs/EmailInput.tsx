import { Rect, Text, Group, Transformer } from 'react-konva';
import { styled } from '@mui/material/styles';
import { EmailInputObj, TextObjTemp } from '../../../../../utils/types/CanvasInterfaces';
import React, { useRef, useEffect } from 'react';
import Konva from 'konva';
import InputLabel from './InputLabel';

const TextInputContainer = styled(Rect)({
    borderRadius: '4px',
    border: '1px solid #C4C4C4',
    padding: '12px'
});

interface EmailInputProps {
    emailInputObj: EmailInputObj;
    handleDragStart: any;
    handleDragEnd: any;
    isSelected: boolean;
    onSelect: any;
    onTransformEnd: any;
    handleDragMove: any;
    draggable?: boolean;
}

const EmailInput = ({ emailInputObj, handleDragStart, handleDragEnd, isSelected, onSelect, onTransformEnd, handleDragMove, draggable = true }: EmailInputProps) => {
    const shapeRef = useRef<Konva.Group>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const createTempTextKonvaShape = (content: TextObjTemp) => new Konva.Text({
        text: content.value,
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

    const tempTextShape = createTempTextKonvaShape(emailInputObj.content);
    const textWidth = tempTextShape.width();
    const textHeight = tempTextShape.height();
    const containerWidth = textWidth + textWidth * .25;
    const containerHeight = textHeight + textHeight * .25;

    const getXAlignment = (text: TextObjTemp) => {
        switch (text.align) {
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
                key={emailInputObj.id}
                id={emailInputObj.id}
                displayName={emailInputObj.label}
                x={emailInputObj.x}
                y={emailInputObj.y}
                draggable={draggable}
                onDragMove={handleDragMove}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                ref={shapeRef}
                rotation={emailInputObj.rotation}
                onClick={onSelect}
                onTap={onSelect}
            >
                <TextInputContainer
                    width={containerWidth}
                    height={containerHeight}
                    fill='#F5F5F5'
                    scaleX={1}
                    scaleY={1} />
                {/* Input Label */}
                {emailInputObj.hasLabel && (
                    <InputLabel labelObj={emailInputObj.label} x={getXAlignment(emailInputObj.label)} y={getYAlignment() - 25} />
                )}
                {/* Input Placeholder */}
                <Text
                    x={getXAlignment(emailInputObj.content)}
                    y={getYAlignment()}
                    text={`${emailInputObj.content.value}`}
                    fontSize={emailInputObj.content.fontSize}
                    fill={emailInputObj.content.fill}
                    fontFamily={emailInputObj.content.fontFamily}
                    fontStyle={emailInputObj.content.fontStyle}
                    scaleX={1}
                    scaleY={1} />
                <Text
                    x={containerWidth - textWidth * .15}
                    y={5}
                    text='@'
                    fontSize={emailInputObj.content.fontSize * .6}
                    fill={'gray'}
                    scaleX={1}
                    scaleY={1} />
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
                    rotationSnaps={[0, 90, 180, 270]}
                />
            )}
        </React.Fragment>
    );
};

export default EmailInput;