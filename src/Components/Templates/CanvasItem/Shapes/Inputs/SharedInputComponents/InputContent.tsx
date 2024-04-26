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
    const divRef = useRef<HTMLDivElement>(null);
    const { canvasDesign, setCanvasDesign, setSelectedId } = useCanvasDesignContext();

    const onSelect = () => {
        setSelectedId(inputObj.id);
    }

    const handleDoubleClick = () => {
        if(inputObj.type !== 'DateInput')
        setEditing(true); // Enable editing mode
    };

    const style: React.CSSProperties = {
        display: "flex",
        position: 'absolute',
        fontSize: textObj.fontSize,
        fontFamily: textObj.fontFamily,
        fontStyle: textObj.fontStyle,
        textDecoration: textObj.textDecoration,
        color: textObj.fill,
        width: contentWidth + 4,
        height: contentHeight,
        outline: 'none',
        lineHeight: 'normal',
        overflow: 'auto',
        padding: '0px',
        margin: '0px',
        boxSizing: 'border-box',
        textWrap: 'wrap',
    };

    const val = textObj.value;
    const onInput = (event: any) => {
        updateInputProperty(canvasDesign, setCanvasDesign, 'content', 'value', event.target.textContent, inputObj.id);
    };

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
        if (editing && divRef.current) {
            const range = document.createRange();
            const sel = window.getSelection();
            range.selectNodeContents(divRef.current);
            range.collapse(false);
            sel?.removeAllRanges();
            sel?.addRange(range);
            divRef.current.focus();
        }
    }, [editing, textObj.value]);

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
                    />)
                }
                {editing && (
                    <Html>
                        <div
                            ref={divRef}
                            contentEditable={true}
                            style={style}
                            onInput={onInput}
                            suppressContentEditableWarning={true}
                            defaultValue={val}
                        >
                            {val}
                        </div>
                    </Html>
                )}
            </Group>
        </>

    );
};

export default InputContent;