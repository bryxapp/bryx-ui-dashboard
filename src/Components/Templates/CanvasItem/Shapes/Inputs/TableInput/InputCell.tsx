import { Rect, Group, Text } from 'react-konva';
import React, { useRef, useEffect, useState } from 'react';
import Konva from 'konva';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';
import ShapeTransformer from '../../SharedShapeComponents/ShapeTransformer';
import { FILL_COLOR, getInputCellXAlignment, getInputCellYAlignment } from '../Input/InputHelper';
import { CellInputObj, HorizontalAlign, TextCellObj, VerticalAlign } from '../../../../../../utils/types/CanvasInterfaces';
import { updateCellContentProperty } from '../../../../../../utils/shapeManagementUtils';
import { Html } from 'react-konva-utils';

interface ContentCellProps {
    contentCell: CellInputObj | TextCellObj;
    cellWidth: number;
    cellHeight: number;
    horizontalAlign: HorizontalAlign
    verticalAlign: VerticalAlign
}

const ContentCell = ({ contentCell, cellWidth, cellHeight, horizontalAlign, verticalAlign }: ContentCellProps) => {
    const [editing, setEditing] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { canvasDesign, setCanvasDesign, setSelectedId, selectedId } = useCanvasDesignContext();
    const isSelected = contentCell.id === selectedId;
    const trRef = useRef<Konva.Transformer>(null);
    const shapeRef = useRef<Konva.Group>(null);
    const onSelect = () => {
        setSelectedId(contentCell.id);
    }

    const isInputCell = contentCell.type === 'CellInput';

    const moveCaretToEnd = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        const { target } = event;
        target.setSelectionRange(target.value.length, target.value.length);
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
        width: cellWidth - 4,
        height: cellHeight - 4,
        color: contentCell.fill,
        padding: '0px',
        margin: '0px',
        overflow: 'hidden',
        outline: 'none',
        lineHeight: '1',
        minWidth: '10px',
        border: 'none',
        wordWrap: 'normal',
        whiteSpace: 'nowrap',
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
        updateCellContentProperty(canvasDesign, setCanvasDesign, 'textValue', event.target.value, contentCell.id);
    };

    return (
        <React.Fragment>
            <Group
                key={contentCell.id}
                id={contentCell.id}
                x={contentCell.x + 2}
                y={contentCell.y + 2}
                draggable={false}
                onClick={onSelect}
                onTap={onSelect}
                onDblClick={() => setEditing(true)}
                onDblTap={() => setEditing(true)}
                ref={shapeRef}
            >
                <Rect
                    width={cellWidth - 4}
                    height={cellHeight - 4}
                    fill={isInputCell ? FILL_COLOR : 'transparent'}
                    onClick={onSelect}
                    onTap={onSelect}
                    onDblClick={() => setEditing(true)}
                    onDblTap={() => setEditing(true)}
                />
                <Group
                    x={getInputCellXAlignment(contentCell,contentCell.textValue, cellWidth, horizontalAlign.toString())}
                    y={getInputCellYAlignment(contentCell,contentCell.textValue, cellHeight, verticalAlign.toString())}
                >
                    {!editing ? (
                        <Text
                            text={contentCell.textValue}
                            fontSize={contentCell.fontSize}
                            fill={contentCell.fill}
                            fontFamily={contentCell.fontFamily}
                            fontStyle={contentCell.fontStyle}
                            textDecoration={contentCell.textDecoration}
                            onClick={onSelect}
                            onTap={onSelect}
                            onDblClick={() => setEditing(true)}
                            onDblTap={() => setEditing(true)}
                            draggable={false}
                            minWidth={10}
                        />
                    ) : (
                        <Html>
                            <textarea
                                ref={textAreaRef}
                                onChange={onChange}
                                style={style}
                                id={contentCell.id}
                                value={contentCell.textValue}
                                autoFocus
                                onFocus={moveCaretToEnd}
                            />
                        </Html>
                    )}
                </Group>
            </Group>
            {isSelected && (
                <>
                    <ShapeTransformer
                        shapeObj={contentCell}
                        trRef={trRef}
                    />
                </>
            )}
        </React.Fragment>
    );
};

export default ContentCell;