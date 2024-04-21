
import { CellInputObj, ParagraphObj, TableCellObj } from '../../../../../../utils/types/CanvasInterfaces';
import Paragraph from '../../TextFields/Paragraph';
import { createTempTextKonvaShape, getXAlignment, getYAlignment } from '../SharedInputComponents/InputHelper';
import InputCell from './InputCell';

interface CellContentProps {
    cell: TableCellObj;
    cellXPosition: number;
    cellYPosition: number;
    handleSelect: any;
}

const TableCellContent = ({ cell, cellXPosition, cellYPosition, handleSelect }: CellContentProps) => {
    if (!cell.content) return null;

    if (cell.content.type === 'Paragraph') {
        const paragraphObj = cell.content as ParagraphObj
        // Adjust the X and Y position of the content based on the cell's alignment
        let contentX = cellXPosition + 5; // Add some padding
        let contentY = cellYPosition + 5; // Add some padding

        const tempTextShape = createTempTextKonvaShape(paragraphObj, paragraphObj.value);
        // Adjust Y based on vertical alignment
        const yalign = getYAlignment(tempTextShape.height(), cell.verticalAlign, cell.height);
        const xalign = getXAlignment(tempTextShape.width(), cell.horizontalAlign, cell.width);
        paragraphObj.x = contentX + xalign;
        paragraphObj.y = contentY + yalign;
        return (
            <>
                <Paragraph
                    paragraphObj={paragraphObj}
                    handleDragEnd={() => { }}
                    handleDragMove={() => { }}
                    onTransformEnd={() => { }}
                    draggable={false}
                />
            </>
        );
    }

    if (cell.content.type === 'CellInput') {
        const cellInputObj = cell.content as CellInputObj;
        cellInputObj.x = cellXPosition + 5;
        cellInputObj.y = cellYPosition + 5;
        return (
            <InputCell
                cellInputObj={cellInputObj}
                containerWidth={cell.width}
                containerHeight={cell.height}
                horizontalAlignment={cell.horizontalAlign}
                verticalAlignment={cell.verticalAlign}
            />
        );
    }

    return null
}


export default TableCellContent;