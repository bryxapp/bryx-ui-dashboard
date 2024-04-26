import { HorizontalAlign, TextCellObj, VerticalAlign } from '../../../../../../utils/types/CanvasInterfaces';
import { Group, Text } from 'react-konva';
import { Html } from 'react-konva-utils';
import React, { useState, useRef, useEffect } from 'react';
import Konva from 'konva';
import { updateInputProperty } from '../../../../../../utils/shapeManagementUtils';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';
import ShapeTransformer from '../../SharedShapeComponents/ShapeTransformer';
interface TextCellProps {
    textCellObj: TextCellObj;
    containerWidth: number;
    containerHeight: number;
    horizontalAlign: HorizontalAlign
    verticalAlign: VerticalAlign
}

const TextCell = ({
    textCellObj,
    containerWidth,
    containerHeight,
    horizontalAlign,
    verticalAlign,
}: TextCellProps) => {
    const [editing, setEditing] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const shapeRef = useRef<Konva.Group>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const { selectedId, setSelectedId, canvasDesign, setCanvasDesign } = useCanvasDesignContext();
    const isSelected = textCellObj.id === selectedId;
    const onSelect = () => {
        setSelectedId(textCellObj.id);
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

    const moveCaretToEnd = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        const { target } = event;
        const { value } = target;
        target.setSelectionRange(value.length, value.length);
    };

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
    }, [textCellObj, isSelected]);

    useEffect(() => {
        if (isSelected && shapeRef.current) {
            // we need to attach transformer manually
            trRef.current?.nodes([shapeRef.current]);
            trRef.current?.getLayer()?.batchDraw();
        }
    }, [isSelected]);


    const style: React.CSSProperties = {
        position: 'absolute',
        resize: 'none',
        fontSize: textCellObj.fontSize,
        fontFamily: textCellObj.fontFamily,
        fontStyle: textCellObj.fontStyle,
        textDecoration: textCellObj.textDecoration,
        color: textCellObj.fill,
        width: containerWidth - 4,
        height: containerHeight - 4,
        textAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        outline: 'none',
        overflow: 'auto',
        padding: '0px',
        margin: '0px',
        boxSizing: 'border-box',
        textWrap: 'wrap',
        lineHeight: '1',
        minWidth: '10px',
        border: 'none',
        whiteSpace: 'pre-wrap',
    };

    const onChange = (event: any) => {
        updateInputProperty(canvasDesign, setCanvasDesign, 'content', 'value', event.target.value, textCellObj.id);
    };

    return (
        <React.Fragment>
            <Group
                key={textCellObj.id}
                id={textCellObj.id}
                x={textCellObj.x + 2}
                y={textCellObj.y + 2}
                draggable={false}
                ref={shapeRef} rotation={0}>
                {!editing && (
                    <Text
                        text={textCellObj.value}
                        fontSize={textCellObj.fontSize}
                        fill={textCellObj.fill}
                        width={containerWidth - 4}
                        height={containerHeight - 4}
                        onClick={onSelect}
                        onTap={onSelect}
                        onDblClick={() => setEditing(true)}
                        onDblTap={() => setEditing(true)}
                        fontFamily={textCellObj.fontFamily}
                        fontStyle={textCellObj.fontStyle}
                        textDecoration={textCellObj.textDecoration}
                        align={horizontalAlign}
                        verticalAlign={verticalAlign}
                        draggable={false}
                    />
                )}
                {editing && (
                    <Html>
                        <textarea
                            ref={textAreaRef}
                            onChange={onChange}
                            style={style}
                            id={textCellObj.id}
                            value={textCellObj.value}
                            autoFocus
                            onFocus={moveCaretToEnd}
                        />
                    </Html>
                )}
            </Group>
            {isSelected && (
                <>
                    <ShapeTransformer
                        trRef={trRef}
                        onTransformEnd={() => { }}
                        rotationEnabled={false}
                        resizeEnabled={false}
                        keepRatio={true}
                    />
                </>
            )}
        </React.Fragment>
    );
};

export default TextCell;

