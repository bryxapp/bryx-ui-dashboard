import { CellInputObj, TableCellObj, TableInputObj, TextCellObj } from '../../../../../../utils/types/CanvasInterfaces';
import InputCell from './InputCell';
import EmptyCell from './EmptyCell';

interface CellProps {
    cell: TableCellObj;
    cellIndex: number;
    row: TableCellObj[];
    rowIndex: number;
    tableInputObj: TableInputObj;
}

const TableCell = ({ cell, row, rowIndex, cellIndex, tableInputObj }: CellProps) => {

    // Calculate the X and Y position of the cell shape    
    const cellXPosition = row.slice(0, cellIndex).reduce((acc, prevCell) => acc + prevCell.width, 0);
    const cellYPosition = tableInputObj.rows.slice(0, rowIndex).reduce((acc, prevRow) => acc + prevRow[0].height, 0);

    if (!cell.content) {
        cell.x = cellXPosition;
        cell.y = cellYPosition;
        return <EmptyCell emptyCellObj={cell} containerWidth={cell.width} containerHeight={cell.height} />
    }

    const contentCellObj = cell.content.type === 'CellInput' ? cell.content as CellInputObj : cell.content as TextCellObj;
    contentCellObj.x = cellXPosition;
    contentCellObj.y = cellYPosition;
    contentCellObj.id = cell.id;
    return (
        <>
            <InputCell
                contentCell={contentCellObj}
                cellWidth={cell.width}
                cellHeight={cell.height}
                horizontalAlign={cell.horizontalAlign}
                verticalAlign={cell.verticalAlign}
            />
        </>
    );
}


export default TableCell;