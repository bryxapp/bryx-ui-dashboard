import { Rect, Group, Text } from 'react-konva';
import React, { useRef, useEffect, useState } from 'react';
import Konva from 'konva';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';
import ShapeTransformer from '../../SharedShapeComponents/ShapeTransformer';
import { FILL_COLOR, createTempTextKonvaShape, getXAlignment, getYAlignment } from '../SharedInputComponents/InputHelper';
import { CellInputObj, HorizontalAlign, VerticalAlign } from '../../../../../../utils/types/CanvasInterfaces';
import { updateInputProperty } from '../../../../../../utils/shapeManagementUtils';
import { Html } from 'react-konva-utils';

interface InputCellProps {
    cellInputObj: CellInputObj;
    containerWidth: number;
    containerHeight: number;
    horizontalAlign: HorizontalAlign
    verticalAlign: VerticalAlign
}

const InputCell = ({ cellInputObj, containerWidth, containerHeight, horizontalAlign, verticalAlign }: InputCellProps) => {
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();
    const shapeRef = useRef<Konva.Group>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [editing, setEditing] = useState(false);
    const { selectedId, setSelectedId } = useCanvasDesignContext();
    const isSelected = cellInputObj.id === selectedId;
    const onSelect = () => {
        setSelectedId(cellInputObj.id);
    }

    const moveCaretToEnd = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        const { target } = event;
        const { value } = target;
        target.setSelectionRange(value.length, value.length);
    };

    const style: React.CSSProperties = {
        position: 'absolute',
        background: 'none',
        resize: 'none',
        fontSize: `${cellInputObj.fontSize / 16}em`,
        fill: cellInputObj.fill,
        fontFamily: cellInputObj.fontFamily,
        fontStyle: cellInputObj.fontStyle,
        textDecoration: cellInputObj.textDecoration,
        whiteSpace: 'pre-wrap',
        width: containerWidth - 4,
        height: containerHeight - 4,
        textAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        color: cellInputObj.fill,
        padding: '0px',
        margin: '0px',
        overflow: 'hidden',
        outline: 'none',
        lineHeight: '1',
        minWidth: '10px',
        border: 'none',
    };

    useEffect(() => {
        if (isSelected && shapeRef.current) {
            // we need to attach transformer manually
            trRef.current?.nodes([shapeRef.current]);
            trRef.current?.getLayer()?.batchDraw();
        }
    }, [isSelected]);

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
    }, [cellInputObj, isSelected]);

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

    const onChange = (event: any) => {
        updateInputProperty(canvasDesign, setCanvasDesign, 'content', 'value', event.target.value, cellInputObj.id);
    };

    return (
        <React.Fragment>
            <Group
                key={cellInputObj.id}
                id={cellInputObj.id}
                x={cellInputObj.x + 2}
                y={cellInputObj.y + 2}
                draggable={false}
                ref={shapeRef}
                onClick={onSelect}
                onTap={onSelect}
                onDblClick={() => setEditing(true)}
                onDblTap={() => setEditing(true)}
            >
                <Rect
                    width={containerWidth - 4}
                    height={containerHeight - 4}
                    fill={FILL_COLOR}
                    onClick={onSelect}
                    onTap={onSelect}
                />
                {!editing && (
                    <>
                        <Rect
                            width={containerWidth - 4}
                            height={containerHeight - 4}
                            fill='transparent'
                            onDblClick={() => setEditing(true)}
                            onDblTap={() => setEditing(true)}
                        />
                        <Text
                            text={cellInputObj.value}
                            fontSize={cellInputObj.fontSize}
                            fill={cellInputObj.fill}
                            width={containerWidth - 4}
                            height={containerHeight - 4}
                            onClick={onSelect}
                            onTap={onSelect}
                            onDblClick={() => setEditing(true)}
                            onDblTap={() => setEditing(true)}
                            fontFamily={cellInputObj.fontFamily}
                            fontStyle={cellInputObj.fontStyle}
                            textDecoration={cellInputObj.textDecoration}
                            align={horizontalAlign}
                            verticalAlign={verticalAlign}
                            draggable={false}
                            minWidth={10}
                        />
                    </>
                )
                }
                {editing && (
                    <Html>
                        <textarea
                            ref={textAreaRef}
                            onChange={onChange}
                            style={style}
                            id={cellInputObj.id}
                            value={cellInputObj.value}
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

export default InputCell;