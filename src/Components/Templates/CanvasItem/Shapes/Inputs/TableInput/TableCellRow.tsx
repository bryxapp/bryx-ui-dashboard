import { TableCellObj, TableInputObj } from '../../../../../../utils/types/CanvasInterfaces';
import TableCell from './TableCell';

interface CellRowProps {
    row: TableCellObj[];
    rowIndex: number;
    tableInputObj: TableInputObj;
}

const TableCellRow = ({ row, rowIndex, tableInputObj}: CellRowProps) => {
    return (
        <>
            {row.map((cell, cellIndex) => (
                <TableCell
                    key={`${rowIndex}-${cellIndex}`}
                    cell={cell}
                    cellIndex={cellIndex}
                    row={row}
                    rowIndex={rowIndex}
                    tableInputObj={tableInputObj}
                />
            ))}
        </>
    );
};

export default TableCellRow;