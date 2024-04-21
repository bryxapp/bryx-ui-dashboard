import { HeadingObj } from '../../../../../utils/types/CanvasInterfaces';
import { Group, Rect, Text } from 'react-konva';
import { Html } from 'react-konva-utils';
import React, { useState, useRef, useEffect } from 'react';
import Konva from 'konva';
import { updateShapeProperty } from '../../../../../utils/shapeManagementUtils';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import ShapeTransformer from '../SharedShapeComponents/ShapeTransformer';

interface HeadingProps {
    headingObj: HeadingObj;
    handleDragEnd: any;
    onTransformEnd: any;
    handleDragMove: any;
    draggable?: boolean;
}

const Heading = ({
    headingObj,
    handleDragEnd,
    onTransformEnd,
    handleDragMove,
    draggable = true
}: HeadingProps) => {
    const [editing, setEditing] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const shapeRef = useRef<Konva.Group>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const { canvasDesign, setCanvasDesign, selectedId, setSelectedId } = useCanvasDesignContext();
    const isSelected = headingObj.id === selectedId;
    const onSelect = () => {
        setSelectedId(headingObj.id);
    }

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
        // This effect will re-run whenever shortTextInputObj changes.
        if (shapeRef.current && trRef.current) {
            // Directly update the size of the Konva elements based on the new shortTextInputObj properties.
            // You might want to recalculate your sizes here similar to what is done outside useEffect.
            // Then, update the transformer if it is selected.
            if (isSelected) {
                trRef.current.nodes([shapeRef.current]);
                trRef.current.getLayer()?.batchDraw();
            }
        }
    }, [headingObj, isSelected]);

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
    const rectWidth = measureWidth(headingObj.value, headingObj.fontSize, headingObj.fontFamily);
    const rectHeight = measureHeight(headingObj.value, headingObj.fontSize, headingObj.fontFamily);

    return (
        <>
            <Group
                key={headingObj.id} id={headingObj.id}
                x={headingObj.x} y={headingObj.y}
                draggable={draggable}
                onDragEnd={handleDragEnd}
                onDragMove={handleDragMove}
                ref={shapeRef} rotation={headingObj.rotation}>
                <Rect
                    width={rectWidth}
                    height={rectHeight}
                    fill='transparent'
                    onClick={onSelect}
                    onTap={onSelect}
                />
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
                <>
                    <ShapeTransformer
                        trRef={trRef}
                        onTransformEnd={onTransformEnd}
                        rotationEnabled={true}
                        resizeEnabled={false}
                        keepRatio={true}
                    />
                </>
            )}
        </>
    );
};

export default Heading;

