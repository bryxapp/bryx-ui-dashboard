
import { CellInputObj, TableCellObj, TextCellObj } from '../../../../../../utils/types/CanvasInterfaces';
import InputCell from './InputCell';
import TextCell from './TextCell';

interface CellContentProps {
    cell: TableCellObj;
    cellXPosition: number;
    cellYPosition: number;
    handleSelect: any;
}

const TableCellContent = ({ cell, cellXPosition, cellYPosition, handleSelect }: CellContentProps) => {
    if (!cell.content) return null;

    if (cell.content.type === 'TextCell') {
        const textCellObj = cell.content as TextCellObj
        textCellObj.x = cellXPosition;
        textCellObj.y = cellYPosition;
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

    return null
}


export default TableCellContent;