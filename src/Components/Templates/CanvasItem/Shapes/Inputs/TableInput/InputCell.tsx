import { Rect, Group, Text } from 'react-konva';
import React, { useRef, useEffect, useState } from 'react';
import Konva from 'konva';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';
import ShapeTransformer from '../../SharedShapeComponents/ShapeTransformer';
import { FILL_COLOR } from '../SharedInputComponents/InputHelper';
import { CellInputObj, HorizontalAlign, TextCellObj, VerticalAlign } from '../../../../../../utils/types/CanvasInterfaces';
import { updateInputProperty } from '../../../../../../utils/shapeManagementUtils';
import { Html } from 'react-konva-utils';

interface ContentCellProps {
    contentCell: CellInputObj | TextCellObj;
    containerWidth: number;
    containerHeight: number;
    horizontalAlign: HorizontalAlign
    verticalAlign: VerticalAlign
}

const ContentCell = ({ contentCell, containerWidth, containerHeight, horizontalAlign, verticalAlign }: ContentCellProps) => {
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();
    const shapeRef = useRef<Konva.Group>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [editing, setEditing] = useState(false);
    const { selectedId, setSelectedId } = useCanvasDesignContext();
    const isSelected = contentCell.id === selectedId;
    const onSelect = () => {
        setSelectedId(contentCell.id);
    }

    const isInputCell = contentCell.type === 'CellInput';

    const moveCaretToEnd = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        const { target } = event;
        const { value } = target;
        target.setSelectionRange(value.length, value.length);
    };

    const style: React.CSSProperties = {
        position: 'absolute',
        background: 'none',
        resize: 'none',
        fontSize: `${contentCell.fontSize / 16}em`,
        fill: contentCell.fill,
        fontFamily: contentCell.fontFamily,
        fontStyle: contentCell.fontStyle,
        textDecoration: contentCell.textDecoration,
        whiteSpace: 'pre-wrap',
        width: containerWidth - 4,
        height: containerHeight - 4,
        textAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        color: contentCell.fill,
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
    }, [contentCell, isSelected]);

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
        updateInputProperty(canvasDesign, setCanvasDesign, 'value', event.target.value, contentCell.id);
    };

    return (
        <React.Fragment>
            <Group
                key={contentCell.id}
                id={contentCell.id}
                x={contentCell.x + 2}
                y={contentCell.y + 2}
                draggable={false}
                ref={shapeRef}
                onClick={onSelect}
                onTap={onSelect}
                onDblClick={() => setEditing(true)}
                onDblTap={() => setEditing(true)}
            >
                {isInputCell && (
                    <Rect
                        width={containerWidth - 4}
                        height={containerHeight - 4}
                        fill={FILL_COLOR}
                        onClick={onSelect}
                        onTap={onSelect}
                    />)}
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
                            text={contentCell.value}
                            fontSize={contentCell.fontSize}
                            fill={contentCell.fill}
                            width={containerWidth - 4}
                            height={containerHeight - 4}
                            onClick={onSelect}
                            onTap={onSelect}
                            onDblClick={() => setEditing(true)}
                            onDblTap={() => setEditing(true)}
                            fontFamily={contentCell.fontFamily}
                            fontStyle={contentCell.fontStyle}
                            textDecoration={contentCell.textDecoration}
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
                            id={contentCell.id}
                            value={contentCell.value}
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
                        horizontalResizeEnabled={false}
                        verticalResizeEnabled={false}
                    />
                </>
            )}
        </React.Fragment>
    );
};

export default ContentCell;