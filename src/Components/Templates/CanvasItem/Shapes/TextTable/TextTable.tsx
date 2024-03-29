import React, { useEffect, useRef } from 'react';
import { Group, Line, Rect, Transformer } from 'react-konva';
import { CanvasDesignData, ShapeObj, TextTableObj } from '../../../../../utils/types/CanvasInterfaces';
import Konva from 'konva';
import CellRow from './CellRow/CellRow';
import { drawBorders } from '../../../../../utils/konvaExtensionUtils';

interface TextTableProps {
    textTableObj: TextTableObj;
    handleDragStart: (event: Konva.KonvaEventObject<DragEvent>) => void;
    handleDragEnd: (event: Konva.KonvaEventObject<DragEvent>) => void;
    handleDragMove: (event: Konva.KonvaEventObject<DragEvent>) => void;
    canvasDesign: CanvasDesignData;
    setCanvasDesign: (design: CanvasDesignData) => void;
    onSelect: any;
}

const TextTable: React.FC<TextTableProps> = ({
    textTableObj,
    handleDragStart,
    handleDragEnd,
    handleDragMove,
    canvasDesign,
    setCanvasDesign,
    onSelect
}) => {

    const shapeRef = useRef<Konva.Rect>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const isSelected = textTableObj.id === canvasDesign.selectedId;
    //Calculate total table width based on individual cell widths
    const tableWidth = textTableObj.rows[0].reduce((acc, cell) => acc + cell.width, 0);
    //Calculate total table height based on individual cell heights
    const tableHeight = textTableObj.rows.reduce((acc, row) => acc + row[0].height, 0);

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

    const updateColumnWidth = (columnIndex: number, delta: number) => {
        const updatedShapes = canvasDesign.Shapes.map((shape: ShapeObj) => {
            if (shape.id === textTableObj.id) {
                const newTableObj = JSON.parse(JSON.stringify(shape)) as TextTableObj;
                newTableObj.rows.forEach(row => {
                    if (row[columnIndex]) {
                        row[columnIndex].width += delta;
                    }
                });
                return newTableObj;
            }
            return shape;
        });

        setCanvasDesign({ ...canvasDesign, Shapes: updatedShapes });
    };

    const updateRowHeight = (rowIndex: number, delta: number) => {
        const updatedShapes = canvasDesign.Shapes.map((shape: ShapeObj) => {
            if (shape.id === textTableObj.id) {
                const newTableObj = JSON.parse(JSON.stringify(shape)) as TextTableObj;
                newTableObj.rows[rowIndex].forEach(cell => {
                    cell.height += delta;
                });
                return newTableObj;
            }
            return shape;
        });

        setCanvasDesign({ ...canvasDesign, Shapes: updatedShapes });
    };

    const changeCursor = (cursorStyle: string) => {
        const stage = shapeRef.current?.getStage();
        if (stage) {
            const container = stage.container();
            container.style.cursor = cursorStyle;
        }
    };

    const addRowResizeHandles = () => {
        const handles = [];
        let accumulatedHeight = 0;

        for (let i = 0; i < textTableObj.rows.length; i++) { // Exclude the last row
            accumulatedHeight += textTableObj.rows[i][0].height;

            const handleY = accumulatedHeight; // Position at the end of the row
            handles.push(
                <Rect
                    key={`resize-handle-${i}`}
                    x={0} // Adjust based on your needs
                    y={handleY}
                    width={tableWidth}
                    height={6}
                    fill="transparent"
                    draggable
                    onDragMove={(e) => {
                        const delta = e.target.y() - handleY;
                        updateRowHeight(i, delta); // Implement this function to update row height
                    }}
                    onDragEnd={(e) => {
                        // Optionally, adjust the handle position after dragging
                        e.target.y(handleY);
                    }}
                    dragBoundFunc={(pos) => {
                        // Prevent the handle from being dragged outside the table
                        return {
                            x: textTableObj.x,
                            y: pos.y
                        };
                    }}
                    onMouseEnter={() => changeCursor('row-resize')}
                    onMouseLeave={() => changeCursor('default')}
                    onClick={(e: any) => handleSelect(textTableObj.id, 'table', e)}
                    onTap={(e: any) => handleSelect(textTableObj.id, 'table', e)}
                />
            );
        }

        return handles;
    }

    const addColumnResizeHandles = () => {
        const handles = [];
        let accumulatedWidth = 0;

        for (let i = 0; i < textTableObj.rows[0].length; i++) { // Exclude the last column
            accumulatedWidth += textTableObj.rows[0][i].width;

            const handleX = accumulatedWidth; // Position at the end of the column
            handles.push(
                <Rect
                    key={`resize-handle-${i}`}
                    x={handleX}
                    y={0} // Adjust based on your needs
                    width={6}
                    height={tableHeight}
                    fill="transparent"
                    draggable
                    onDragMove={(e) => {
                        const delta = e.target.x() - handleX;
                        updateColumnWidth(i, delta); // Implement this function to update column width
                    }}
                    onDragEnd={(e) => {
                        e.target.x(handleX);
                    }}
                    dragBoundFunc={(pos) => {
                        // Prevent the handle from being dragged outside the table
                        return {
                            x: pos.x,
                            y: textTableObj.y
                        };
                    }}
                    onMouseEnter={() => changeCursor('col-resize')} // Use 'ew-resize' or 'col-resize' for horizontal resizing
                    onMouseLeave={() => changeCursor('default')}
                    onClick={(e: any) => handleSelect(textTableObj.id, 'table', e)}
                    onTap={(e: any) => handleSelect(textTableObj.id, 'table', e)}
                />
            );
        }

        return handles;
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
            >
                <Rect
                    width={tableWidth} // Assuming fixed cell width
                    height={tableHeight} // Assuming fixed cell height
                    fill="transparent" // Using transparent fill to catch click events
                    stroke={textTableObj.border ? textTableObj.border.color : 'transparent'}
                    strokeWidth={textTableObj.border ? textTableObj.border.width : 0}
                    ref={shapeRef}
                    onClick={(e: any) => handleSelect(textTableObj.id, 'table', e)}
                    onTap={(e: any) => handleSelect(textTableObj.id, 'table', e)}
                />
                {drawBorders(textTableObj).map((lineProps) => (
                    <Line {...lineProps} />
                ))}
                {textTableObj.rows.map((row, rowIndex) =>
                    <CellRow
                        key={`row-${rowIndex}`}
                        row={row}
                        rowIndex={rowIndex}
                        textTableObj={textTableObj}
                        handleSelect={handleSelect}
                        canvasDesign={canvasDesign}
                        setCanvasDesign={setCanvasDesign}
                    />
                )}
                {addColumnResizeHandles()}
                {addRowResizeHandles()}
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
