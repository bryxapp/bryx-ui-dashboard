import { CanvasDesignData, HeadingObj } from '../../../../../utils/types/CanvasInterfaces';
import { Group, Rect, Text, Transformer } from 'react-konva';
import { Html } from 'react-konva-utils';
import React, { useState, useRef, useEffect } from 'react';
import Konva from 'konva';
import { updateShapeProperty } from '../../../../../utils/shapeManagementUtils';
import TextPropertiesMenu from '../../CanvasToolbar/InputStyler/TextPropertiesMenu/TextPropertiesMenu';
import DeleteButton from '../../CanvasToolbar/DeleteButton';

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
    const rectWidth = measureWidth(headingObj.value, headingObj.fontSize, headingObj.fontFamily) + 20;
    const rectHeight = measureHeight(headingObj.value, headingObj.fontSize, headingObj.fontFamily) + 20;

    return (
        <>
            <Group
                key={headingObj.id} id={headingObj.id}
                x={headingObj.x} y={headingObj.y}
                draggable={draggable}
                onDragStart={handleDragStart}
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
                <>
                    <Html>
                        <div
                            style={{
                                position: 'absolute',
                                left: `${headingObj.x + rectWidth + 10}px`, // Adjusted to apply positioning
                                top: `${headingObj.y - 15}px`,
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
                            <TextPropertiesMenu textObj={headingObj} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} itemType={null} />
                            <DeleteButton isLoading={false} canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} />
                        </div>

                    </Html>
                    <Transformer
                        ref={trRef}
                        onTransformEnd={onTransformEnd}
                        rotateEnabled={true}
                        anchorSize={10}
                        resizeEnabled={false}
                        keepRatio={false}
                    />
                </>
            )}
        </>
    );
};

export default Heading;

