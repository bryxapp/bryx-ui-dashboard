import { Rect, Text } from 'react-konva';
import { getTextXAlignment } from './InputHelper';
import { InputLabelObj } from '../../../../../../utils/types/CanvasInterfaces';
import { useEffect, useRef, useState } from 'react';
import { Html } from 'react-konva-utils';
import { getTextWidthAndHeight, updateInputProperty } from '../../../../../../utils/shapeManagementUtils';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';

interface InputContentProps {
    inputLabelObj: InputLabelObj;
    inputObjId: string;
    contentHeight: number;
    containerWidth: number;
}

const InputLabel = ({ inputLabelObj, inputObjId, contentHeight, containerWidth }: InputContentProps) => {
    const [editing, setEditing] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();

    const onChange = (event: any) => {
        updateInputProperty(canvasDesign, setCanvasDesign, 'label', 'value', event.target.value, inputObjId);
    };

    const moveCaretToEnd = (event: React.FocusEvent<HTMLTextAreaElement>) => {
        const { target } = event;
        const { value } = target;
        target.setSelectionRange(value.length, value.length);
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

    const [labelWidth, labelHeight] = getTextWidthAndHeight(inputLabelObj, inputLabelObj.value)

    const style: React.CSSProperties = {
        position: 'absolute',
        background: 'none',
        resize: 'none',
        fontSize: `${inputLabelObj.fontSize / 16}em`,
        fill: inputLabelObj.fill,
        fontFamily: inputLabelObj.fontFamily,
        fontStyle: inputLabelObj.fontStyle,
        textDecoration: inputLabelObj.textDecoration,
        whiteSpace: 'pre-wrap',
        width: `${labelWidth + 20}px`,
        height: `${labelHeight + 20}px`,
        alignContent: inputLabelObj.horizontalAlign,
        color: inputLabelObj.fill,
        padding: '0px',
        margin: '0px',
        overflow: 'hidden',
        outline: 'none',
        lineHeight: 'normal',
        minWidth: '10px',
        border: 'none',
    };

    return (
        <>
            {!editing && (
                <>
                    <Rect // Transparent overlay to capture double-click events
                        x={0}
                        y={0}
                        width={containerWidth}
                        height={contentHeight}
                        onDblClick={() => setEditing(true)}
                        onDblTap={() => setEditing(true)}
                        opacity={0}
                        listening={true}
                    />
                    <Text
                        x={getTextXAlignment(inputLabelObj, containerWidth, inputLabelObj.horizontalAlign)}
                        y={0}
                        onDblClick={() => setEditing(true)}
                        onDblTap={() => setEditing(true)}
                        text={inputLabelObj.value}
                        fontSize={inputLabelObj.fontSize}
                        fill={inputLabelObj.fill}
                        fontFamily={inputLabelObj.fontFamily}
                        fontStyle={inputLabelObj.fontStyle}
                        textDecoration={inputLabelObj.textDecoration}
                        scaleX={1}
                        scaleY={1}
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
                        id={inputObjId}
                        value={inputLabelObj.value}
                        autoFocus
                        onFocus={moveCaretToEnd}
                    />
                </Html>
            )}
        </>
    );
};

export default InputLabel;