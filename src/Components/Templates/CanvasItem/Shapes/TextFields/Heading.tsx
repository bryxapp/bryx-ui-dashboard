import { CanvasDesignData, HeadingObj } from '../../../../../utils/types/CanvasInterfaces';
import { Group, Text, Transformer } from 'react-konva';
import { Html } from 'react-konva-utils';
import React, { useState, useRef, useEffect } from 'react';
import Konva from 'konva';
import { updateShapeProperty } from '../../../../../utils/shapeManagementUtils';

interface HeadingProps {
    headingObj: HeadingObj;
    handleDragStart: any;
    handleDragEnd: any;
    canvasDesign: CanvasDesignData;
    setCanvasDesign: any;
    isSelected: boolean;
    onSelect: any;
    onTransformEnd: any;
    handleDragMove: any;
    draggable?: boolean;
}

const Heading = ({
    headingObj,
    handleDragStart,
    handleDragEnd,
    canvasDesign,
    setCanvasDesign,
    isSelected,
    onSelect,
    onTransformEnd,
    handleDragMove,
    draggable = true
}: HeadingProps) => {
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
        position: 'absolute',
        background: 'none',
        resize: 'none',
        fontSize: `${headingObj.fontSize / 16}em`,
        fill: headingObj.fill,
        fontFamily: headingObj.fontFamily,
        fontStyle: headingObj.fontStyle,
        textDecoration: headingObj.textDecoration,
        whiteSpace: 'pre-wrap',
        width: `${measureWidth(headingObj.value, headingObj.fontSize, headingObj.fontFamily) + 20}px`,
        height: `${measureHeight(headingObj.value, headingObj.fontSize, headingObj.fontFamily) + 20}px`,
        alignContent: headingObj.align,
        color: headingObj.fill,
        border: 'none',
        padding: '0px',
        margin: '0px',
        overflow: 'hidden',
        outline: 'none',
        lineHeight: 'normal',
    };


    const onChange = (event: any) => {
        updateShapeProperty(canvasDesign, setCanvasDesign, 'value', event.target.value, headingObj.id);
    };

    const moveCaretToEnd = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        const { target } = event;
        const { value } = target;
        target.setSelectionRange(value.length, value.length);
    };

    return (
        <React.Fragment>
            <Group
                key={headingObj.id} id={headingObj.id}
                x={headingObj.x} y={headingObj.y}
                draggable={draggable}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragMove={handleDragMove}
                ref={shapeRef} rotation={headingObj.rotation}>
                {!editing && (
                    <Text
                        text={headingObj.value}
                        fontSize={headingObj.fontSize}
                        fill={headingObj.fill}
                        onClick={onSelect}
                        onTap={onSelect}
                        onDblClick={() => setEditing(true)}
                        onDblTap={() => setEditing(true)}
                        fontFamily={headingObj.fontFamily}
                        fontStyle={headingObj.fontStyle}
                        textDecoration={headingObj.textDecoration}
                        align={headingObj.align}
                        draggable={false}
                    />

                )}
                {editing && (
                    <Html>
                        <textarea
                            ref={textAreaRef}
                            onChange={onChange}
                            style={style}
                            id={headingObj.id}
                            value={headingObj.value}
                            autoFocus
                            onFocus={moveCaretToEnd}
                        />
                    </Html>
                )}
            </Group>
            {isSelected && !editing && (
                <Transformer
                    ref={trRef}
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

export default Heading;

