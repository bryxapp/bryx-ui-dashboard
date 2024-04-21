
import { CellInputObj, TableCellObj, TextCellObj } from '../../../../../../utils/types/CanvasInterfaces';
import { createTempTextKonvaShape, getXAlignment, getYAlignment } from '../SharedInputComponents/InputHelper';
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
        // Adjust the X and Y position of the content based on the cell's alignment
        let contentX = cellXPosition;
        let contentY = cellYPosition;
        const tempTextShape = createTempTextKonvaShape(textCellObj, textCellObj.value);
        // Adjust Y based on vertical alignment
        const yalign = getYAlignment(tempTextShape.height(), cell.verticalAlign, cell.height);
        const xalign = getXAlignment(tempTextShape.width(), cell.horizontalAlign, cell.width);
        textCellObj.x = contentX + xalign;
        textCellObj.y = contentY + yalign;
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