import React, { useEffect, useRef } from 'react';
import { Group, Line, Rect, Transformer } from 'react-konva';
import { CanvasDesignData, TextTableObj } from '../../../../../utils/types/CanvasInterfaces';
import Konva from 'konva';
import CellRow from './CellRow/CellRow';
import { addColumnResizeHandles, addRowResizeHandles, drawBorders } from '../TextTableUtils';
import TableGrabber from './TableGrabber/TableGrabber';

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
                <TableGrabber handleSelect={() => handleSelect(textTableObj.id, 'table')} shapeRef={shapeRef}/>
                <Rect
                    width={tableWidth}
                    height={tableHeight}
                    fill="transparent" // Using transparent fill to catch click events
                    stroke={textTableObj.border ? textTableObj.border.color : 'transparent'} // Border color    
                    strokeWidth={textTableObj.border ? textTableObj.border.width : 0}
                    ref={shapeRef}
                    onClick={(e: any) => handleSelect(textTableObj.id, 'table', e)}
                    onTap={(e: any) => handleSelect(textTableObj.id, 'table', e)}
                />
                {drawBorders(textTableObj, canvasDesign.selectedId === textTableObj.id).map((lineProps) => (
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
                {addColumnResizeHandles(textTableObj, tableHeight, shapeRef, canvasDesign, setCanvasDesign, handleSelect)}
                {addRowResizeHandles(textTableObj, tableWidth, shapeRef, canvasDesign, setCanvasDesign, handleSelect)}
            </Group>
            {isSelected && (
                <Transformer
                    ref={trRef}
                    onTransformEnd={() => { }}
                    rotateEnabled={false}
                    anchorSize={0}
                    resizeEnabled={false}
                    keepRatio={false}
                    anchorStroke='#00a2ff'
                />
            )}
        </>
    );
};

export default TextTable;
