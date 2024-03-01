import React, { useEffect, useRef, useState } from 'react';
import { Circle, Group, Line, Rect, Transformer } from 'react-konva';
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

const addColumnResizeHandles = (textTableObj: TextTableObj, updateColumnWidth: any) => {
    const handles = [];
    let accumulatedWidth = 0;

    for (let i = 0; i < textTableObj.rows[0].length - 1; i++) { // Exclude the last column
        accumulatedWidth += textTableObj.rows[0][i].width;

        const handleX = accumulatedWidth; // Position at the end of the column
        handles.push(
            <Circle
                key={`resize-handle-${i}`}
                x={handleX}
                y={0} // Adjust based on your needs
                radius={5}
                fill="red"
                draggable
                onDragMove={(e) => {
                    const delta = e.target.x() - handleX;
                    updateColumnWidth(i, delta); // Implement this function to update column width
                }}
                onDragEnd={(e) => {
                    // Optionally, adjust the handle position after dragging
                    e.target.x(handleX);
                }}
            />
        );
    }

    return handles;
};

const addRowResizeHandles = (textTableObj: TextTableObj, updateRowHeight: any) => {
    const handles = [];
    let accumulatedHeight = 0;

    for (let i = 0; i < textTableObj.rows.length - 1; i++) { // Exclude the last row
        accumulatedHeight += textTableObj.rows[i][0].height;

        const handleY = accumulatedHeight; // Position at the end of the row
        handles.push(
            <Circle
                key={`resize-handle-${i}`}
                x={0} // Adjust based on your needs
                y={handleY}
                radius={5}
                fill="red"
                draggable
                onDragMove={(e) => {
                    const delta = e.target.y() - handleY;
                    updateRowHeight(i, delta); // Implement this function to update row height
                }}
                onDragEnd={(e) => {
                    // Optionally, adjust the handle position after dragging
                    e.target.y(handleY);
                }}
            />
        );
    }

    return handles;
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
    const [tableObj, setTableObj] = useState(textTableObj); // Use state to manage dynamic changes

    useEffect(() => {
        if (isSelected && shapeRef.current) {
            // we need to attach transformer manually
            trRef.current?.nodes([shapeRef.current]);
            trRef.current?.getLayer()?.batchDraw();
        }
    }, [isSelected, tableObj]);

    const handleSelect = (id: string, type: 'table' | 'item', event?: Konva.KonvaEventObject<MouseEvent>) => {
        // Prevent event propagation if it's an item selection to avoid selecting the table
        if (type === 'item' && event) {
            event.cancelBubble = true;
        }
        onSelect(id);
    };

    const updateColumnWidth = (columnIndex: number, delta: number) => {
        // Implement logic to update the specified column's width and adjust the table layout
        const newTableObj = { ...tableObj };
        newTableObj.rows.forEach(row => {
            if (row[columnIndex]) {
                row[columnIndex].width += delta;
            }
        });
        setTableObj(newTableObj); // Update state to reflect changes
    };

    const updateRowHeight = (rowIndex: number, delta: number) => {
        // Implement logic to update the specified row's height and adjust the table layout
        const newTableObj = { ...tableObj };
        newTableObj.rows[rowIndex].forEach(cell => {
            cell.height += delta;
        });
        setTableObj(newTableObj); // Update state to reflect changes
    }

    const resizeHandles = addColumnResizeHandles(tableObj, updateColumnWidth);
    const rowResizeHandles = addRowResizeHandles(tableObj, updateRowHeight);

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
                {resizeHandles}
                {rowResizeHandles}
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
