import React, { useEffect, useRef } from 'react';
import { Group, Line, Rect, Transformer } from 'react-konva';
import { CanvasDesignData, TextTableObj, TextInputObj, TextFieldObj } from '../../../../utils/types/CanvasInterfaces';
import TextInput from './TextInput';
import TextField from './TextField';
import Konva from 'konva';
import { drawBorders } from '../../../../utils/canvas-util';

interface TextTableProps {
    textTableObj: TextTableObj;
    handleDragStart: (event: Konva.KonvaEventObject<DragEvent>) => void;
    handleDragEnd: (event: Konva.KonvaEventObject<DragEvent>) => void;
    handleDragMove: (event: Konva.KonvaEventObject<DragEvent>) => void;
    canvasDesign: CanvasDesignData;
    setCanvasDesign: (design: CanvasDesignData) => void;
    isSelected: boolean;
    onSelect: any;
}

const TextTable: React.FC<TextTableProps> = ({
    textTableObj,
    handleDragStart,
    handleDragEnd,
    handleDragMove,
    canvasDesign,
    setCanvasDesign,
    onSelect,
    isSelected
}) => {

    const shapeRef = useRef<Konva.Group>(null);
    const trRef = useRef<Konva.Transformer>(null);

    useEffect(() => {
        if (isSelected && shapeRef.current) {
            // we need to attach transformer manually
            trRef.current?.nodes([shapeRef.current]);
            trRef.current?.getLayer()?.batchDraw();
        }
    }, [isSelected]);

    const handleSelect = (id: string, type: 'table' | 'item', event?: Konva.KonvaEventObject<MouseEvent>) => {
        // Prevent event propagation if it's an item selection to avoid selecting the table
        if (type === 'item' && event) {
            event.cancelBubble = true;
        }
        onSelect(id);
    };
    //Calculate total table width based on individual cell widths
    const tableWidth = textTableObj.rows[0].reduce((acc, cell) => acc + cell.width, 0);
    //Calculate total table height based on individual cell heights
    const tableHeight = textTableObj.rows.reduce((acc, row) => acc + row[0].height, 0);

    return (
        <>
            <Group
                key={textTableObj.id}
                id={textTableObj.id}
                x={textTableObj.x}
                y={textTableObj.y}
                draggable
                onDragMove={handleDragMove}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                ref={shapeRef}
                onClick={(e: any) => handleSelect(textTableObj.id, 'table', e)}
                onTap={(e: any) => handleSelect(textTableObj.id, 'table', e)}
            >
                <Rect
                    width={tableWidth} // Assuming fixed cell width
                    height={tableHeight} // Assuming fixed cell height
                    fill="transparent" // Using transparent fill to catch click events
                    stroke={textTableObj.border ? textTableObj.border.color : 'transparent'}
                    strokeWidth={textTableObj.border ? textTableObj.border.width : 0}
                />
                {drawBorders(textTableObj).map((lineProps) => (
                    <Line {...lineProps} />
                ))}
                {textTableObj.rows.map((row, rowIndex) =>
                    row.map((cell, cellIndex) => {
                        // Calculate the X position of the cell based on the widths of all previous cells in the row
                        const cellX = row.slice(0, cellIndex).reduce((acc, prevCell) => acc + prevCell.width, 0);
                        // Calculate the Y position of the cell based on the heights of all rows above the current row
                        const cellY = textTableObj.rows.slice(0, rowIndex).reduce((acc, prevRow) => acc + prevRow[0].height, 0);
                        if (cell.content?.type === 'TextInput') {
                            let textInput = cell.content as TextInputObj;
                            return (
                                <TextInput
                                    key={`${rowIndex}-${cellIndex}`}
                                    textInputObj={{ ...textInput, x: cellX, y: cellY }}
                                    handleDragStart={() => { }}
                                    handleDragMove={() => { }}
                                    handleDragEnd={() => { }}
                                    isSelected={textInput.id === canvasDesign.selectedId}
                                    onSelect={(e: any) => handleSelect(textInput.id, 'item', e)}
                                    onTransformEnd={() => { }}
                                    draggable={false}
                                />
                            );
                        } else {
                            let textField = cell.content as TextFieldObj;
                            return (
                                <TextField
                                    key={`${rowIndex}-${cellIndex}`}
                                    textFieldObj={{ ...textField, x: cellX, y: cellY }}
                                    handleDragStart={() => { }}
                                    handleDragEnd={() => { }}
                                    handleDragMove={() => { }}
                                    isSelected={textField.id === canvasDesign.selectedId}
                                    onSelect={(e: any) => handleSelect(textField.id, 'item', e)}
                                    onTransformEnd={() => { }}
                                    canvasDesign={canvasDesign}
                                    setCanvasDesign={setCanvasDesign}
                                    draggable={false}
                                />
                            );
                        }
                    })
                )}
            </Group>
            {isSelected && (
                <Transformer
                    ref={trRef}
                    onTransformEnd={() => { }}
                    rotateEnabled={false}
                    anchorSize={0}
                    resizeEnabled={false}
                    keepRatio={false}
                />
            )}
        </>
    );
};

export default TextTable;
