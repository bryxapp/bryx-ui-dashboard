import { Group, Rect, Text } from 'react-konva';
import { FILL_COLOR, getInputXAlignment, getInputYAlignment } from './InputHelper'
import { InputObj } from '../../../../../../utils/types/CanvasInterfaces';
import { useEffect, useRef, useState } from 'react';
import { Html } from 'react-konva-utils';
import { updateInputProperty } from '../../../../../../utils/shapeManagementUtils';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';

interface InputContentProps {
    inputObj: InputObj;
    verticalAlign?: string;
    containerWidth: number;
    inputHeight: number;
    inputWidth: number;
    contentHeight: number;
    contentWidth: number;
    labelHeight: number;
}

const InputContent = ({ inputObj, verticalAlign, containerWidth, inputHeight, inputWidth, contentHeight, contentWidth, labelHeight, }: InputContentProps) => {
    const textObj = inputObj.content;
    const labelOffset = inputObj.hasLabel ? labelHeight + (inputObj.label.fontSize / 10) : 0;
    const yalign = verticalAlign ? getInputYAlignment(textObj, textObj.value, contentHeight, verticalAlign) : 0;
    const [editing, setEditing] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { canvasDesign, setCanvasDesign, setSelectedId } = useCanvasDesignContext();

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
        fontSize: `${textObj.fontSize / 16}em`,
        fill: textObj.fill,
        fontFamily: textObj.fontFamily,
        fontStyle: textObj.fontStyle,
        textDecoration: textObj.textDecoration,
        whiteSpace: 'pre-wrap',
        width: `${contentWidth + 20}px`,
        height: `${contentHeight + 20}px`,
        alignContent: textObj.horizontalAlign,
        color: textObj.fill,
        padding: '0px',
        margin: '0px',
        overflow: 'hidden',
        outline: 'none',
        lineHeight: '1',
        minWidth: '10px',
        border: 'none',
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
        updateInputProperty(canvasDesign, setCanvasDesign, 'content', 'value', event.target.value, inputObj.id);
    };

    return (
        <>
            <Rect
                x={0}
                y={labelOffset}
                width={inputWidth}
                height={inputHeight}
                fill={FILL_COLOR}
                onClick={onSelect}
                onTap={onSelect}
                onDoubleClick={handleDoubleClick}
                onDblTap={handleDoubleClick}
            />
            <Group
                x={getInputXAlignment(textObj, textObj.value, containerWidth)}
                y={yalign + labelOffset}
            >
                {!editing && (
                    <>
                        <Rect
                            x={0}
                            y={0}
                            width={contentWidth}
                            height={contentHeight}
                            fill='transparent'
                            onClick={onSelect}
                            onTap={onSelect}
                            onDoubleClick={handleDoubleClick}
                            onDblTap={handleDoubleClick}
                        />
                        <Text
                            text={`${textObj.value}`}
                            fontSize={textObj.fontSize}
                            fill={textObj.fill}
                            fontFamily={textObj.fontFamily}
                            fontStyle={textObj.fontStyle}
                            textDecoration={textObj.textDecoration}
                            scaleX={1}
                            scaleY={1}
                            onDblClick={handleDoubleClick}
                            onDblTap={handleDoubleClick}
                            minWidth={10}
                        />
                    </>)
                }
                {editing && (
                    <Html>
                        <textarea
                            ref={textAreaRef}
                            onChange={onChange}
                            style={style}
                            id={inputObj.id}
                            value={textObj.value}
                            autoFocus
                            onFocus={moveCaretToEnd}
                        />
                    </Html>
                )}
            </Group>
        </>

    );
};

export default InputContent;