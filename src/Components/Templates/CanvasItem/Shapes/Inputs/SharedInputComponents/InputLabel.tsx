import { Text } from 'react-konva';
import { getXAlignment } from './InputHelper';
import { TextBase } from '../../../../../../utils/types/CanvasInterfaces';
import { useEffect, useRef, useState } from 'react';
import { Html } from 'react-konva-utils';
import { getTextWidthAndHeight, updateInputProperty } from '../../../../../../utils/shapeManagementUtils';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';

interface InputContentProps {
    textObj: TextBase;
    inputObjId: string;
    contentHeight: number;
    containerWidth: number;
}

const InputLabel = ({ textObj, inputObjId, contentHeight, containerWidth }: InputContentProps) => {
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

    const [labelWidth, labelHeight] = getTextWidthAndHeight(textObj)

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
        width: `${labelWidth + 20}px`,
        height: `${labelHeight + 20}px`,
        alignContent: textObj.align,
        color: textObj.fill,
        border: 'none',
        padding: '0px',
        margin: '0px',
        overflow: 'hidden',
        outline: 'none',
        lineHeight: 'normal',
    };

    return (
        <>
            {!editing && (
                <Text
                    x={getXAlignment(textObj, containerWidth)}
                    y={0}
                    onDblClick={() => setEditing(true)}
                    onDblTap={() => setEditing(true)}
                    text={textObj.value}
                    fontSize={textObj.fontSize}
                    fill={textObj.fill}
                    fontFamily={textObj.fontFamily}
                    fontStyle={textObj.fontStyle}
                    textDecoration={textObj.textDecoration}
                    scaleX={1}
                    scaleY={1} />
            )
            }
            {editing && (
                <Html>
                    <textarea
                        ref={textAreaRef}
                        onChange={onChange}
                        style={style}
                        id={inputObjId}
                        value={textObj.value}
                        autoFocus
                        onFocus={moveCaretToEnd}
                    />
                </Html>
            )}
        </>
    );
};

export default InputLabel;