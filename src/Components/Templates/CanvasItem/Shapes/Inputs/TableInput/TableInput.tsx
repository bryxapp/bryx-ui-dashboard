import { Rect, Group, Line } from 'react-konva';
import React, { useRef, useEffect } from 'react';
import Konva from 'konva';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';
import ShapeTransformer from '../../SharedShapeComponents/ShapeTransformer';
import { ShapeObj, TableInputObj } from '../../../../../../utils/types/CanvasInterfaces';
import { drawBorders } from './tableUtils';
import TableCellRow from './TableCellRow';

interface EmailInputProps {
    tableInputObj: TableInputObj;
    handleDragEnd: any;
    onTransformEnd: any;
    handleDragMove: any;
    draggable?: boolean;
}

const TableInput = ({ tableInputObj, handleDragEnd, onTransformEnd, handleDragMove, draggable = true }: EmailInputProps) => {
    const { selectedId, setSelectedId, canvasDesign, setCanvasDesign } = useCanvasDesignContext();
    //Calculate total table width based on individual cell widths
    const tableWidth = tableInputObj.rows[0].reduce((acc, cell) => acc + cell.width, 0);
    //Calculate total table height based on individual cell heights
    const tableHeight = tableInputObj.rows.reduce((acc, row) => acc + row[0].height, 0);
    const isSelected = tableInputObj.id === selectedId;
    const onSelect = (id: string) => {
        setSelectedId(id);
    };
    const handleSelect = (id: string, type: 'table' | 'item', event?: Konva.KonvaEventObject<MouseEvent>) => {
        // Prevent event propagation if it's an item selection to avoid selecting the table
        if (type === 'item' && event) {
            event.cancelBubble = true;
        }
        onSelect(id);
    };
    const shapeRef = useRef<Konva.Rect>(null);
    const trRef = useRef<Konva.Transformer>(null);

    useEffect(() => {
        if (isSelected && shapeRef.current) {
            // we need to attach transformer manually
            trRef.current?.nodes([shapeRef.current]);
            trRef.current?.getLayer()?.batchDraw();
        }
    }, [isSelected]);

    useEffect(() => {
        // This effect will re-run whenever shortTextInputObj changes.
        if (shapeRef.current && trRef.current) {
            // Directly update the size of the Konva elements based on the new shortTextInputObj properties.
            // You might want to recalculate your sizes here similar to what is done outside useEffect.
            // Then, update the transformer if it is selected.
            if (isSelected) {
                trRef.current.nodes([shapeRef.current]);
                trRef.current.getLayer()?.batchDraw();
            }
        }
    }, [tableInputObj, isSelected]);

    const updateColumnWidth = (columnIndex: number, delta: number) => {
        const updatedShapes = canvasDesign.Shapes.map((shape: ShapeObj) => {
            if (shape.id === tableInputObj.id) {
                const newTableObj = JSON.parse(JSON.stringify(shape)) as TableInputObj;
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
            if (shape.id === tableInputObj.id) {
                const newTableObj = JSON.parse(JSON.stringify(shape)) as TableInputObj;
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

        for (let i = 0; i < tableInputObj.rows.length; i++) { // Exclude the last row
            accumulatedHeight += tableInputObj.rows[i][0].height;

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
                            x: tableInputObj.x,
                            y: pos.y
                        };
                    }}
                    onMouseEnter={() => changeCursor('row-resize')}
                    onMouseLeave={() => changeCursor('default')}
                    onClick={(e: any) => handleSelect(tableInputObj.id, 'table', e)}
                    onTap={(e: any) => handleSelect(tableInputObj.id, 'table', e)}
                />
            );
        }

        return handles;
    }

    const addColumnResizeHandles = () => {
        const handles = [];
        let accumulatedWidth = 0;

        for (let i = 0; i < tableInputObj.rows[0].length; i++) { // Exclude the last column
            accumulatedWidth += tableInputObj.rows[0][i].width;

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
                            y: tableInputObj.y
                        };
                    }}
                    onMouseEnter={() => changeCursor('col-resize')} // Use 'ew-resize' or 'col-resize' for horizontal resizing
                    onMouseLeave={() => changeCursor('default')}
                    onClick={(e: any) => handleSelect(tableInputObj.id, 'table', e)}
                    onTap={(e: any) => handleSelect(tableInputObj.id, 'table', e)}
                />
            );
        }

        return handles;
    };

    return (
        <React.Fragment>
            <Group
                key={tableInputObj.id}
                id={tableInputObj.id}
                x={tableInputObj.x}
                y={tableInputObj.y}
                draggable
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
            >
                <Rect
                    width={tableWidth}
                    height={tableHeight}
                    fill="transparent"
                    stroke={tableInputObj.border ? tableInputObj.border.color : 'transparent'}
                    strokeWidth={tableInputObj.border ? tableInputObj.border.width : 0}
                    ref={shapeRef}
                    onClick={(e: any) => handleSelect(tableInputObj.id, 'table', e)}
                    onTap={(e: any) => handleSelect(tableInputObj.id, 'table', e)}
                />
                {drawBorders(tableInputObj).map((lineProps) => (
                    <Line {...lineProps} />
                ))}
                {tableInputObj.rows.map((row, rowIndex) =>
                    <TableCellRow
                        key={`row-${rowIndex}`}
                        row={row}
                        rowIndex={rowIndex}
                        tableInputObj={tableInputObj}
                        handleSelect={handleSelect}
                        canvasDesign={canvasDesign}
                        setCanvasDesign={setCanvasDesign}
                    />
                )}
                {addColumnResizeHandles()}
                {addRowResizeHandles()}
            </Group>
            {isSelected && (
                <>
                    <ShapeTransformer
                        trRef={trRef}
                        onTransformEnd={onTransformEnd}
                        rotationEnabled={true}
                        resizeEnabled={false}
                        keepRatio={true}
                    />
                </>
            )}
        </React.Fragment>
    );
};

export default TableInput;