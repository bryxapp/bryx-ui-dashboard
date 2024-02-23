import React from 'react';
import { Group } from 'react-konva';
import { CanvasDesignData, TextTableObj, TextInputObj, TextFieldObj } from '../../../../utils/types/CanvasInterfaces';
import TextInput from './TextInput';
import TextField from './TextField';
import Konva from 'konva';

interface TextTableProps {
    textTableObj: TextTableObj;
    handleDragStart: (event: Konva.KonvaEventObject<DragEvent>) => void;
    handleDragEnd: (event: Konva.KonvaEventObject<DragEvent>) => void;
    handleDragMove: (event: Konva.KonvaEventObject<DragEvent>) => void;
    canvasDesign: CanvasDesignData;
    setCanvasDesign: (design: CanvasDesignData) => void;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

const TextTable: React.FC<TextTableProps> = ({
    textTableObj,
    handleDragStart,
    handleDragEnd,
    handleDragMove,
    canvasDesign,
    setCanvasDesign,
    onSelect,
}) => {

    const doNothing = () => { };
    return (
        <Group draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragMove={handleDragMove}>
            {textTableObj.rows.map((row, rowIndex) =>
                row.map((cell, cellIndex) => {
                    if (cell.type === 'TextInput') {
                        const textInput = cell as TextInputObj;
                        return (
                            <TextInput
                                key={`${rowIndex}-${cellIndex}`}
                                textInputObj={textInput}
                                handleDragStart={doNothing}
                                handleDragMove={doNothing}
                                handleDragEnd={doNothing}
                                isSelected={textInput.id === canvasDesign.selectedId}
                                onSelect={() => onSelect(textInput.id)}
                                onTransformEnd={doNothing}
                                draggable={false}
                            />
                        );
                    } else {
                        const textField = cell as TextFieldObj;
                        return (
                            <TextField
                                key={`${rowIndex}-${cellIndex}`}
                                textFieldObj={textField}
                                handleDragStart={doNothing}
                                handleDragEnd={doNothing}
                                handleDragMove={doNothing}
                                isSelected={textField.id === canvasDesign.selectedId}
                                onSelect={() => onSelect(textField.id)}
                                onTransformEnd={doNothing}
                                canvasDesign={canvasDesign}
                                setCanvasDesign={setCanvasDesign}
                                draggable={false}
                            />
                        );
                    }
                })
            )}
        </Group>
    );
};

export default TextTable;
