import { CellInputObj, TableCellObj, TableInputObj, TextCellObj } from '../../../../../../utils/types/CanvasInterfaces';
import TextCell from './TextCell';
import InputCell from './InputCell';
import EmptyCell from './EmptyCell';

interface CellProps {
    cell: TableCellObj;
    cellIndex: number;
    row: TableCellObj[];
    rowIndex: number;
    tableInputObj: TableInputObj;
    handleSelect: any;
}

const TableCell = ({ cell, row, rowIndex, cellIndex, tableInputObj, handleSelect }: CellProps) => {

    // Calculate the X and Y position of the cell shape    
    const cellXPosition = row.slice(0, cellIndex).reduce((acc, prevCell) => acc + prevCell.width, 0);
    const cellYPosition = tableInputObj.rows.slice(0, rowIndex).reduce((acc, prevRow) => acc + prevRow[0].height, 0);

    if (!cell.content) {
        return <EmptyCell emptyCellObj={cell} containerWidth={cell.width} containerHeight={cell.height} />
    }

    if (cell.content.type === 'TextCell') {
        const textCellObj = cell.content as TextCellObj
        textCellObj.x = cellXPosition;
        textCellObj.y = cellYPosition;
        textCellObj.id = cell.id;
        return (
            <>
                <TextCell
                    textCellObj={textCellObj}
                    containerWidth={cell.width}
                    containerHeight={cell.height}
                    horizontalAlign={cell.horizontalAlign}
                    verticalAlign={cell.verticalAlign}
                />
            </>
        );
    }

    if (cell.content.type === 'CellInput') {
        const cellInputObj = cell.content as CellInputObj;
        cellInputObj.x = cellXPosition;
        cellInputObj.y = cellYPosition;
        cellInputObj.id = cell.id;
        return (
            <InputCell
                cellInputObj={cellInputObj}
                containerWidth={cell.width}
                containerHeight={cell.height}
                horizontalAlign={cell.horizontalAlign}
                verticalAlign={cell.verticalAlign}
            />
        );
    }

    return null;
}


export default TableCell;