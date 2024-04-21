import { ParagraphObj } from '../../../../../utils/types/CanvasInterfaces';
import { Group, Text } from 'react-konva';
import { Html } from 'react-konva-utils';
import React, { useState, useRef, useEffect } from 'react';
import Konva from 'konva';
import { getTextWidthAndHeight, updateShapeProperty } from '../../../../../utils/shapeManagementUtils';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import ShapeTransformer from '../SharedShapeComponents/ShapeTransformer';
import { createTempTextKonvaShape } from '../Inputs/SharedInputComponents/InputHelper';

interface ParagraphProps {
    paragraphObj: ParagraphObj;
    handleDragEnd: any;
    onTransformEnd: any;
    handleDragMove: any;
    draggable?: boolean;
}

const Paragraph = ({
    paragraphObj,
    handleDragEnd,
    onTransformEnd,
    handleDragMove,
    draggable = true
}: ParagraphProps) => {
    const [editing, setEditing] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const shapeRef = useRef<Konva.Group>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const { selectedId, setSelectedId, canvasDesign, setCanvasDesign } = useCanvasDesignContext();
    const isSelected = paragraphObj.id === selectedId;
    let [paragraphWidth, paragraphHeight] = getTextWidthAndHeight(paragraphObj, paragraphObj.value)
    const onSelect = () => {
        setSelectedId(paragraphObj.id);
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
    }, [paragraphObj, isSelected]);

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
        fontSize: paragraphObj.fontSize,
        fill: paragraphObj.fill,
        fontFamily: paragraphObj.fontFamily,
        fontStyle: paragraphObj.fontStyle,
        textDecoration: paragraphObj.textDecoration,
        whiteSpace: 'pre-wrap',
        width: paragraphWidth,
        height: paragraphHeight+20,
        textAlign: paragraphObj.horizontalAlign,
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

    return (
        <React.Fragment>
            <Group
                key={paragraphObj.id} id={paragraphObj.id}
                x={paragraphObj.x} y={paragraphObj.y}
                draggable={draggable}
                onDragEnd={handleDragEnd}
                onDragMove={handleDragMove}
                ref={shapeRef} rotation={paragraphObj.rotation}>
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
                        align={paragraphObj.horizontalAlign}
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
                            key="paragraphTextArea"
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
        </React.Fragment>
    );
};

export default Paragraph;

