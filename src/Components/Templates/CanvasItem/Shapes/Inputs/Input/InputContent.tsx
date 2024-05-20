import { Group, Rect, Text } from 'react-konva';
import { Html } from 'react-konva-utils';
import { useEffect, useRef, useState } from 'react';
import Konva from 'konva';

import { FILL_COLOR, getInputXAlignment, getInputYAlignment } from './InputHelper';
import { InputObj } from '../../../../../../utils/types/CanvasInterfaces';
import { updateInputProperty } from '../../../../../../utils/shapeManagementUtils';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';
import ShapeTransformer from '../../SharedShapeComponents/ShapeTransformer';
import useShapeMove from '../../../useShapeMove';

interface InputContentProps {
    inputObj: InputObj;
    verticalAlign?: string;
}

const InputContent = ({ inputObj, verticalAlign }: InputContentProps) => {
    const yAlign = verticalAlign ? getInputYAlignment(inputObj, verticalAlign) : 0;
    const [editing, setEditing] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { canvasDesign, setCanvasDesign, setSelectedId, selectedId } = useCanvasDesignContext();
    const isSelected = inputObj.id === selectedId;
    const trRef = useRef<Konva.Transformer>(null);
    const shapeRef = useRef<Konva.Group>(null);
    const { handleDragEnd, onTransformEnd, handleDragMove } = useShapeMove(setCanvasDesign, canvasDesign);

    const [inputWidth, setInputWidth] = useState(inputObj.width);
    const [inputHeight, setInputHeight] = useState(inputObj.height);

    useEffect(() => {
        if (isSelected && shapeRef.current) {
            trRef.current?.nodes([shapeRef.current]);
            trRef.current?.getLayer()?.batchDraw();
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (textAreaRef.current && !textAreaRef.current.contains(event.target as Node)) {
                setEditing(false);
            }
        };

        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSelected, inputObj]);

    const onSelect = () => {
        setSelectedId(inputObj.id);
    };

    const moveCaretToEnd = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        const { target } = event;
        target.setSelectionRange(target.value.length, target.value.length);
    };

    const handleDoubleClick = () => {
        if (inputObj.type !== 'DateInput') setEditing(true);
    };

    const style: React.CSSProperties = {
        position: 'absolute',
        background: 'none',
        resize: 'none',
        fontSize: `${inputObj.fontSize / 16}em`,
        fill: inputObj.fill,
        fontFamily: inputObj.fontFamily,
        fontStyle: inputObj.fontStyle,
        textDecoration: inputObj.textDecoration,
        width: `${inputWidth}px`,
        height: `${inputHeight}px`,
        alignContent: inputObj.horizontalAlign,
        color: inputObj.fill,
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

    const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateInputProperty(canvasDesign, setCanvasDesign, 'value', event.target.value, inputObj.id);
    };

    const handleTransform = (event: Konva.KonvaEventObject<Event>) => {
        const node = event.target;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        node.scaleX(1);
        node.scaleY(1);

        const newWidth = inputWidth * scaleX;
        const newHeight = inputHeight * scaleY;
        setInputWidth(newWidth);
        setInputHeight(newHeight);

        node.width(newWidth);
        node.height(newHeight);
    };

    return (
        <>
            <Group
                key={inputObj.id}
                id={inputObj.id}
                x={inputObj.x}
                y={inputObj.y}
                draggable
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
                rotation={inputObj.rotation}
                onClick={onSelect}
                onTap={onSelect}
                width={inputWidth}
                height={inputHeight}
                ref={shapeRef}
            >
                <Rect
                    x={0}
                    y={0}
                    width={inputWidth}
                    height={inputHeight}
                    fill={FILL_COLOR}
                    onClick={onSelect}
                    onTap={onSelect}
                    onDoubleClick={handleDoubleClick}
                    onDblTap={handleDoubleClick}
                />
                <Group x={getInputXAlignment(inputObj)} y={yAlign}>
                    {!editing ? (
                        <Text
                            text={inputObj.value}
                            fontSize={inputObj.fontSize}
                            fill={inputObj.fill}
                            fontFamily={inputObj.fontFamily}
                            fontStyle={inputObj.fontStyle}
                            textDecoration={inputObj.textDecoration}
                            onDblClick={handleDoubleClick}
                            onDblTap={handleDoubleClick}
                            minWidth={10}
                        />
                    ) : (
                        <Html>
                            <textarea
                                ref={textAreaRef}
                                onChange={onChange}
                                style={style}
                                id={inputObj.id}
                                value={inputObj.value}
                                autoFocus
                                onFocus={moveCaretToEnd}
                            />
                        </Html>
                    )}
                </Group>
            </Group>
            {isSelected && (
                <ShapeTransformer
                    shapeObj={inputObj}
                    trRef={trRef}
                    onTransform={handleTransform}
                    onTransformEnd={onTransformEnd}
                />
            )}
        </>
    );
};

export default InputContent;