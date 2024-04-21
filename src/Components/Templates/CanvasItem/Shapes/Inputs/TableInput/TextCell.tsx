import { HorizontalAlign, TextCellObj, VerticalAlign } from '../../../../../../utils/types/CanvasInterfaces';
import { Group, Text } from 'react-konva';
import { Html } from 'react-konva-utils';
import React, { useState, useRef, useEffect } from 'react';
import Konva from 'konva';
import { getTextWidthAndHeight, updateShapeProperty } from '../../../../../../utils/shapeManagementUtils';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';
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
    let [paragraphWidth, paragraphHeight] = getTextWidthAndHeight(textCellObj, textCellObj.value)
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
        background: 'none',
        resize: 'none',
        fontSize: textCellObj.fontSize,
        fill: textCellObj.fill,
        fontFamily: textCellObj.fontFamily,
        fontStyle: textCellObj.fontStyle,
        textDecoration: textCellObj.textDecoration,
        whiteSpace: 'pre-wrap',
        width: paragraphWidth,
        height: paragraphHeight + 20,
        textAlign: horizontalAlign,
        color: textCellObj.fill,
        border: 'none',
        padding: '0px',
        margin: '0px',
        overflow: 'hidden',
        outline: 'none',
        lineHeight: 'normal',
    };


    const onChange = (event: any) => {
        updateShapeProperty(canvasDesign, setCanvasDesign, 'value', event.target.value, textCellObj.id);
    };

    const moveCaretToEnd = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        const { target } = event;
        const { value } = target;
        target.setSelectionRange(value.length, value.length);
    };

    return (
        <React.Fragment>
            <Group
                key={textCellObj.id} id={textCellObj.id}
                x={textCellObj.x} y={textCellObj.y}
                draggable={false}
                ref={shapeRef} rotation={0}>
                {!editing && (
                    <Text
                        text={textCellObj.value}
                        fontSize={textCellObj.fontSize}
                        fill={textCellObj.fill}
                        onClick={onSelect}
                        onTap={onSelect}
                        onDblClick={() => setEditing(true)}
                        onDblTap={() => setEditing(true)}
                        fontFamily={textCellObj.fontFamily}
                        fontStyle={textCellObj.fontStyle}
                        textDecoration={textCellObj.textDecoration}
                        align={horizontalAlign}
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
                            key="paragraphTextArea"
                        />
                    </Html>
                )}
            </Group>
        </React.Fragment>
    );
};

export default TextCell;

