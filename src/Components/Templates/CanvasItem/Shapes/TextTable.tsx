import React, { useEffect, useRef } from 'react';
import { Group, Line, Rect, Transformer } from 'react-konva';
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

    const drawBorders = () => {
        if (!textTableObj.border) return null;
        const cellWidth = 200;
        const cellHeight = 40;
        const borders = [];
        const tableWidth = textTableObj.rows[0].length * cellWidth;
        const tableHeight = textTableObj.rows.length * cellHeight;

        // Vertical lines
        for (let i = 1; i < textTableObj.rows[0].length; i++) {
            borders.push(
                <Line
                    key={`v-${i}`}
                    points={[cellWidth * i, 0, cellWidth * i, tableHeight]}
                    stroke={textTableObj.border.color}
                    strokeWidth={textTableObj.border.width}
                />
            );
        }

        // Horizontal lines
        for (let i = 1; i < textTableObj.rows.length; i++) {
            borders.push(
                <Line
                    key={`h-${i}`}
                    points={[0, cellHeight * i, tableWidth, cellHeight * i]}
                    stroke={textTableObj.border.color}
                    strokeWidth={textTableObj.border.width}
                />
            );
        }

        return borders;
    };



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
                    width={textTableObj.rows[0].length * 200} // Assuming fixed cell width
                    height={textTableObj.rows.length * 40} // Assuming fixed cell height
                    fill="transparent" // Using transparent fill to catch click events
                    stroke={textTableObj.border ? textTableObj.border.color : 'transparent'}
                    strokeWidth={textTableObj.border ? textTableObj.border.width : 0}
                />
                {drawBorders()}
                {textTableObj.rows.map((row, rowIndex) =>
                    row.map((cell, cellIndex) => {
                        const cellX = cellIndex * 200; // Position relative to the group
                        const cellY = rowIndex * 40; // Position relative to the group
                        if (cell.type === 'TextInput') {
                            let textInput = cell as TextInputObj;
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
                            let textField = cell as TextFieldObj;
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
