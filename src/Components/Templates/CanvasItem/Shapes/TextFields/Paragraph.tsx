import { CanvasDesignData, ParagraphObj } from '../../../../../utils/types/CanvasInterfaces';
import { Group, Rect, Text, Transformer } from 'react-konva';
import { Html } from 'react-konva-utils';
import React, { useState, useRef, useEffect } from 'react';
import Konva from 'konva';
import { updateShapeProperty } from '../../../../../utils/shapeManagementUtils';

interface ParagraphProps {
    paragraphObj: ParagraphObj;
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

const Paragraph = ({
    paragraphObj,
    handleDragStart,
    handleDragEnd,
    canvasDesign,
    setCanvasDesign,
    isSelected,
    onSelect,
    onTransformEnd,
    handleDragMove,
    draggable = true
}: ParagraphProps) => {
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
        fontSize: `${paragraphObj.fontSize / 16}em`,
        fill: paragraphObj.fill,
        fontFamily: paragraphObj.fontFamily,
        fontStyle: paragraphObj.fontStyle,
        textDecoration: paragraphObj.textDecoration,
        whiteSpace: 'pre-wrap',
        width: `${measureWidth(paragraphObj.value, paragraphObj.fontSize, paragraphObj.fontFamily) + 10}px`,
        height: `${measureHeight(paragraphObj.value, paragraphObj.fontSize, paragraphObj.fontFamily) + 10}px`,
        alignContent: paragraphObj.align,
        color: paragraphObj.fill,
        border: 'none',
        padding: '0px',
        margin: '0px',
        overflow: 'hidden',
        outline: 'none',
        lineHeight: 'normal',
    };


    const onChange = (event: any) => {
        updateShapeProperty(canvasDesign, setCanvasDesign, 'value', event.target.value, paragraphObj.id);
    };

    const moveCaretToEnd = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        const { target } = event;
        const { value } = target;
        target.setSelectionRange(value.length, value.length);
    };
    const rectWidth = measureWidth(paragraphObj.value, paragraphObj.fontSize, paragraphObj.fontFamily) + 20;
    const rectHeight = measureHeight(paragraphObj.value, paragraphObj.fontSize, paragraphObj.fontFamily) + 20;

    return (
        <React.Fragment>
            <Group
                key={paragraphObj.id} id={paragraphObj.id}
                x={paragraphObj.x} y={paragraphObj.y}
                draggable={draggable}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragMove={handleDragMove}
                ref={shapeRef} rotation={paragraphObj.rotation}>
                <Rect
                    width={rectWidth}
                    height={rectHeight}
                    fill='transparent'
                    onClick={onSelect}
                    onTap={onSelect}
                />
                {!editing && (
                    <Text
                        text={paragraphObj.value}
                        fontSize={paragraphObj.fontSize}
                        fill={paragraphObj.fill}
                        onClick={onSelect}
                        onTap={onSelect}
                        onDblClick={() => setEditing(true)}
                        onDblTap={() => setEditing(true)}
                        fontFamily={paragraphObj.fontFamily}
                        fontStyle={paragraphObj.fontStyle}
                        textDecoration={paragraphObj.textDecoration}
                        align={paragraphObj.align}
                        draggable={false}
                    />

                )}
                {editing && (
                    <Html>
                        <textarea
                            ref={textAreaRef}
                            onChange={onChange}
                            style={style}
                            id={paragraphObj.id}
                            value={paragraphObj.value}
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

export default Paragraph;

