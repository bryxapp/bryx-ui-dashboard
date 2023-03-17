import { textFieldObj } from '../../../../Utils/types/ShapeInterfaces';
import { Group, Text } from 'react-konva';
import { Html } from 'react-konva-utils';
import React, { useState, useRef, useEffect } from 'react';

interface TextFieldProps {
    textFieldObj: textFieldObj;
    handleDragStart: any;
    handleDragEnd: any;
    canvasDesign: any;
    setCanvasDesign: any;
}

const TextField = ({
    textFieldObj,
    handleDragStart,
    handleDragEnd,
    canvasDesign,
    setCanvasDesign,
}: TextFieldProps) => {
    const [editing, setEditing] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
        if (editing && textAreaRef.current) {
            textAreaRef.current.focus();
            textAreaRef.current.setSelectionRange(textFieldObj.value.length, textFieldObj.value.length);
        }
    }, [editing, textFieldObj.value]);

    const style: React.CSSProperties = {
        background: 'none',
        resize: 'none',
        fontSize: `${textFieldObj.fontSize / 16}em`,
        fill: textFieldObj.fontColor,
        fontFamily: 'sans-serif',
    };


    const onChange = (event: any) => {
        const shapeTypes = Object.keys(canvasDesign);
        const updatedCanvasDesign: any = {};
        shapeTypes.forEach((shapeType) => {
            if (shapeType === 'selectedId') return;
            updatedCanvasDesign[shapeType] = canvasDesign[shapeType].map((shape: any) => {
                return {
                    ...shape,
                    value: shape.id === textFieldObj.id ? event.target.value : shape.value,
                };
            });
        });
        setCanvasDesign(updatedCanvasDesign);
    };

    return (
        <Group x={textFieldObj.x} y={textFieldObj.y} onDragStart={handleDragStart} onDragEnd={handleDragEnd} draggable>
            {!editing && (
                <Text
                    text={textFieldObj.value}
                    fontSize={textFieldObj.fontSize}
                    fill={textFieldObj.fontColor}
                    onClick={() => setEditing(true)}
                    onTap={() => setEditing(true)}
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
                    />
                </Html>
            )}
        </Group>
    );
};

export default TextField;
