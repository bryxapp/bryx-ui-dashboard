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
    const divRef = useRef<HTMLDivElement>(null); // Change ref type
    const shapeRef = useRef<Konva.Group>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const { selectedId, setSelectedId, canvasDesign, setCanvasDesign } = useCanvasDesignContext();
    const isSelected = textCellObj.id === selectedId;
    const onSelect = () => {
        setSelectedId(textCellObj.id);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (divRef.current && !divRef.current.contains(event.target as Node)) {
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

    const horizontalAlignToJustifyContent = (horizontalAlign: HorizontalAlign) => {
        switch (horizontalAlign) {
            case 'left':
                return 'flex-start';
            case 'center':
                return 'center';
            case 'right':
                return 'flex-end';
            default:
                return 'flex-start';
        }
    }

    const verticalAlignToAlignItems = (verticalAlign: VerticalAlign) => {
        switch (verticalAlign) {
            case 'top':
                return 'flex-start';
            case 'middle':
                return 'center';
            case 'bottom':
                return 'flex-end';
            default:
                return 'flex-start';
        }
    }

    const style: React.CSSProperties = {
        display: "flex",
        justifyContent: horizontalAlignToJustifyContent(horizontalAlign),
        alignItems: verticalAlignToAlignItems(verticalAlign),
        position: 'absolute',
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
        lineHeight: 'normal',
        overflow: 'auto',
        padding: '0px',
        margin: '0px',
        boxSizing: 'border-box',
        textWrap: 'wrap',
    };

    const val = textCellObj.value;
    const onInput = (event: any) => {
        updateInputProperty(canvasDesign, setCanvasDesign, 'content', 'value', event.target.textContent, textCellObj.id);
    };

    useEffect(() => {
        if (editing && divRef.current) {
            const range = document.createRange();
            const sel = window.getSelection();
            range.selectNodeContents(divRef.current);
            range.collapse(false);
            sel?.removeAllRanges();
            sel?.addRange(range);
            divRef.current.focus();
        }
    }, [editing, textCellObj.value]);

    const handleDoubleClick = () => {
        setEditing(true); // Enable editing mode
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
                        onDblClick={handleDoubleClick}
                        onDblTap={handleDoubleClick}
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
                        <div
                            ref={divRef}
                            contentEditable={true}
                            style={style}
                            id={textCellObj.id}
                            onInput={onInput}
                            suppressContentEditableWarning={true}
                            defaultValue={val}
                        >
                            {val}
                        </div>
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

