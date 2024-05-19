import { Group, Rect, Text } from 'react-konva';
import { FILL_COLOR, getInputXAlignment, getInputYAlignment } from './InputHelper'
import { InputObj } from '../../../../../../utils/types/CanvasInterfaces';
import { useEffect, useRef, useState } from 'react';
import { Html } from 'react-konva-utils';
import { updateInputProperty } from '../../../../../../utils/shapeManagementUtils';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';
import ShapeTransformer from '../../SharedShapeComponents/ShapeTransformer';
import Konva from 'konva';
import useShapeMove from '../../../useShapeMove';

interface InputContentProps {
    inputObj: InputObj;
    verticalAlign?: string;
}

const InputContent = ({ inputObj, verticalAlign }: InputContentProps) => {
    const yalign = verticalAlign ? getInputYAlignment(inputObj, verticalAlign) : 0;
    const [editing, setEditing] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { canvasDesign, setCanvasDesign, setSelectedId, selectedId } = useCanvasDesignContext();
    const isSelected = inputObj.id === selectedId;
    const trRef = useRef<Konva.Transformer>(null);
    const shapeRef = useRef<Konva.Group>(null);
    const { handleDragEnd, onTransformEnd, handleDragMove } = useShapeMove(setCanvasDesign, canvasDesign);
    console.log("Width: ", inputObj.width, "Height: ", inputObj.height);

    useEffect(() => {
        if (isSelected && shapeRef?.current) {
            // we need to attach transformer manually
            trRef.current?.nodes([shapeRef.current]);
            trRef.current?.getLayer()?.batchDraw();
        }
    }, [isSelected]);

    useEffect(() => {
        // This effect will re-run whenever shortTextInputObj changes.
        // This is necessary to update the transformer's nodes when the shape is selected.
        if (shapeRef?.current && trRef.current && isSelected) {
            const shapeRefCurrent = shapeRef.current;
            trRef.current.nodes([shapeRefCurrent]);
            trRef.current.getLayer()?.batchDraw();
        }
    }, [inputObj, isSelected]);

    const onSelect = () => {
        setSelectedId(inputObj.id);
    }

    const moveCaretToEnd = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        const { target } = event;
        const { value } = target;
        target.setSelectionRange(value.length, value.length);
    };

    const handleDoubleClick = () => {
        if (inputObj.type !== 'DateInput')
            setEditing(true); // Enable editing mode
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
        width: `${inputObj.width}px`,
        height: `${inputObj.height}px`,
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
        updateInputProperty(canvasDesign, setCanvasDesign, 'value', event.target.value, inputObj.id);
    };

    const handleTransform = (event: any) => {
        const node = event.target;
        if (node) {
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            node.scaleX(1);
            node.scaleY(1);
            const rect = node.findOne('Rect');
            if (rect) {
                rect.width(rect.width() * scaleX);
                rect.height(rect.height() * scaleY);
            }
        }
    };

    return (
        <>
            <Group
                key={inputObj.id}
                id={inputObj.id}
                displayName={inputObj.value}
                x={inputObj.x}
                y={inputObj.y}
                draggable={true}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
                rotation={inputObj.rotation}
                onClick={onSelect}
                onTap={onSelect}
                width={inputObj.width}
                height={inputObj.height}
                ref={shapeRef}
            >
                <Rect
                    x={0}
                    y={0}
                    width={inputObj.width}
                    height={inputObj.height}
                    fill={FILL_COLOR}
                    onClick={onSelect}
                    onTap={onSelect}
                    onDoubleClick={handleDoubleClick}
                    onDblTap={handleDoubleClick}
                />
                <Group
                    x={getInputXAlignment(inputObj)}
                    y={yalign}
                    width={inputObj.width}
                    height={inputObj.height}
                >
                    {!editing && (
                        <Text
                            text={`${inputObj.value}`}
                            fontSize={inputObj.fontSize}
                            fill={inputObj.fill}
                            fontFamily={inputObj.fontFamily}
                            fontStyle={inputObj.fontStyle}
                            textDecoration={inputObj.textDecoration}
                            onDblClick={handleDoubleClick}
                            onDblTap={handleDoubleClick}
                            minWidth={10}
                            width={inputObj.width}
                            height={inputObj.height}
                        />)
                    }
                    {editing && (
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