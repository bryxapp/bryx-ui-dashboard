import { CanvasDesignData, ShapeObj, TextFieldObj } from '../../../../utils/types/CanvasInterfaces';
import { Group, Text, Transformer } from 'react-konva';
import { Html } from 'react-konva-utils';
import React, { useState, useRef, useEffect } from 'react';
import Konva from 'konva';

interface TextFieldProps {
    textFieldObj: TextFieldObj;
    handleDragStart: any;
    handleDragEnd: any;
    canvasDesign: CanvasDesignData;
    setCanvasDesign: any;
    isSelected: boolean;
    onSelect: any;
    onTransformEnd: any;
}

const TextField = ({
    textFieldObj,
    handleDragStart,
    handleDragEnd,
    canvasDesign,
    setCanvasDesign,
    isSelected,
    onSelect,
    onTransformEnd
}: TextFieldProps) => {
    const [editing, setEditing] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const shapeRef = useRef<Konva.Group>(null);
    const trRef = useRef<Konva.Transformer>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (textAreaRef.current && !textAreaRef.current.contains(event.target as Node)) {
                setEditing(false);
            }
        };

        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (isSelected && shapeRef.current) {
            // we need to attach transformer manually
            trRef.current?.nodes([shapeRef.current]);
            trRef.current?.getLayer()?.batchDraw();
        }
    }, [isSelected]);

    const measureWidth = (text: string, fontSize: number, fontFamily: string) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
            context.font = `${fontSize}px ${fontFamily}`;
            return context.measureText(text).width;
        }
        return 0;
    };

    const measureHeight = (text: string, fontSize: number, fontFamily: string) => {
        //Calculate new lines 
        const newLines = text.split('\n').length;
        return newLines * fontSize;
    };



    const style: React.CSSProperties = {
        background: 'none',
        resize: 'none',
        fontSize: `${textFieldObj.fontSize / 16}em`,
        fill: textFieldObj.fill,
        fontFamily: textFieldObj.fontFamily,
        fontStyle: textFieldObj.fontStyle,
        textDecoration: textFieldObj.textDecoration,
        whiteSpace: 'pre-wrap',
        width: `${measureWidth(textFieldObj.value, textFieldObj.fontSize, textFieldObj.fontFamily) + 20}px`,
        height: `${measureHeight(textFieldObj.value, textFieldObj.fontSize, textFieldObj.fontFamily) + 20}px`,
    };




    const onChange = (event: any) => {
        const updatedCanvasDesign:  CanvasDesignData = {...canvasDesign};

        canvasDesign.Shapes.forEach((shape: ShapeObj) => {
            if (shape.id === textFieldObj.id) {
                updatedCanvasDesign.Shapes = canvasDesign.Shapes.map((shape: ShapeObj) => {
                    if (shape.id === textFieldObj.id) {
                        return {
                            ...shape,
                            value: event.target.value,
                        };
                    }
                    return shape;
                });
            }
        });
        setCanvasDesign(updatedCanvasDesign);
    };

    const moveCaretToEnd = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        const { target } = event;
        const { value } = target;
        target.setSelectionRange(value.length, value.length);
    };

    return (
        <React.Fragment>
            <Group
                key={textFieldObj.id} id={textFieldObj.id}
                x={textFieldObj.x} y={textFieldObj.y}
                onDragStart={handleDragStart} onDragEnd={handleDragEnd} draggable
                ref={shapeRef} rotation={textFieldObj.rotation}>
                {!editing && (
                    <Text
                        text={textFieldObj.value}
                        fontSize={textFieldObj.fontSize}
                        fill={textFieldObj.fill}
                        onClick={onSelect}
                        onTap={onSelect}
                        onDblClick={() => setEditing(true)}
                        onDblTap={() => setEditing(true)}
                        fontFamily={textFieldObj.fontFamily}
                        fontStyle={textFieldObj.fontStyle}
                        textDecoration={textFieldObj.textDecoration}
                    />

                )}
                {editing && (
                    <Html>
                        <textarea
                            ref={textAreaRef}
                            onChange={onChange}
                            style={style}
                            id={textFieldObj.id}
                            value={textFieldObj.value}
                            autoFocus
                            onFocus={moveCaretToEnd}
                            
                        />
                    </Html>
                )}
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

export default TextField;

