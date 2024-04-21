import Konva from 'konva';
import { Rect, Transformer } from 'react-konva';
import { useEffect, useRef } from 'react';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';
import { TableCellObj, TableInputObj } from '../../../../../../utils/types/CanvasInterfaces';
import TableCellContent from './TableCellContent';

interface CellProps {
    cell: TableCellObj;
    cellIndex: number;
    row: TableCellObj[];
    rowIndex: number;
    tableInputObj: TableInputObj;
    handleSelect: any;
}

const TableCell = ({ cell, row, rowIndex, cellIndex, tableInputObj, handleSelect }: CellProps) => {

    const { selectedId } = useCanvasDesignContext();

    const handleClick = (e: any) => {
        handleSelect(cell.id, 'item', e);
    }

    // Calculate the X and Y position of the cell shape    
    const cellXPosition = row.slice(0, cellIndex).reduce((acc, prevCell) => acc + prevCell.width, 0);
    const cellYPosition = tableInputObj.rows.slice(0, rowIndex).reduce((acc, prevRow) => acc + prevRow[0].height, 0);

    const shapeRef = useRef<Konva.Rect>(null);
    const trRef = useRef<Konva.Transformer>(null);

    useEffect(() => {
        if (cell.id === selectedId && shapeRef.current) {
            trRef.current?.nodes([shapeRef.current]);
            trRef.current?.getLayer()?.batchDraw();
        }
    }, [selectedId, cell.id]);

    return (
        <>
            <Rect
                x={cellXPosition + 5}
                y={cellYPosition + 5}
                width={cell.width - 15}
                height={cell.height - 15}
                fill='transparent'
                onClick={handleClick}
                ref={shapeRef}
            />
            {cell.id === selectedId && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                    rotateEnabled={false}
                    resizeEnabled={false}
                />)}
            <TableCellContent
                cell={cell}
                cellXPosition={cellXPosition}
                cellYPosition={cellYPosition}
                handleSelect={handleClick}
            />
        </>
    );
}


export default TableCell;