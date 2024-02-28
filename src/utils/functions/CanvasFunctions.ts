import { CanvasDesignData, ShapeObj, TextFieldObj, TextInputObj, TextTableObj } from '../types/CanvasInterfaces';
import { generateShapeId } from '../shapeid-util';

export const deleteShape = ({ canvasDesign, setCanvasDesign }: any) => {
    const updatedCanvasDesign: CanvasDesignData = { ...canvasDesign };
    canvasDesign.Shapes.forEach((shape: ShapeObj) => {
        if (shape.id === canvasDesign.selectedId) {
            updatedCanvasDesign.Shapes = canvasDesign.Shapes.filter((shape: ShapeObj) => shape.id !== canvasDesign.selectedId);
        }
    });
    canvasDesign.selectedId = null;
    setCanvasDesign(updatedCanvasDesign);
    selectShape(null, updatedCanvasDesign, setCanvasDesign);
}

export const moveShape = ({ canvasDesign, setCanvasDesign, direction }: any) => {
    const updatedCanvasDesign: CanvasDesignData = { ...canvasDesign };
    canvasDesign.Shapes.forEach((shape: ShapeObj) => {
        if (shape.id === canvasDesign.selectedId) {
            switch (direction) {
                case 'up':
                    shape.y -= 10;
                    break;
                case 'down':
                    shape.y += 10;
                    break;
                case 'left':
                    shape.x -= 10;
                    break;
                case 'right':
                    shape.x += 10;
                    break;
                default:
                    break;
            }
        }
    });
    setCanvasDesign(updatedCanvasDesign);
}

export const selectShape = (id: string | null, canvasDesign: any, setCanvasDesign: any) => {
    setCanvasDesign({
        ...canvasDesign,
        selectedId: id,
    });
};



export const pasteObject = (canvasDesign: CanvasDesignData, setCanvasDesign: React.Dispatch<React.SetStateAction<CanvasDesignData>>, copiedObject: any) => {

    const updatedCanvasDesign = { ...canvasDesign }; // Make a shallow copy of the canvasDesign object

    const pastedObject = JSON.parse(JSON.stringify(copiedObject)); // Make a deep copy of the copiedObject
    pastedObject.id = generateShapeId(); // Generate a unique ID for the pasted object
    pastedObject.x = copiedObject.x + 20;
    pastedObject.y = copiedObject.y + 20;

    updatedCanvasDesign.Shapes.push(pastedObject);
    updatedCanvasDesign.selectedId = pastedObject.id; // Select the pasted object

    setCanvasDesign(updatedCanvasDesign); // Update the canvasDesign state with the pasted object
};

export const toggleTextStyle = (
    canvasDesign: CanvasDesignData,
    setCanvasDesign: React.Dispatch<React.SetStateAction<CanvasDesignData>>,
    style: 'bold' | 'italic' | 'underline' | 'line-through'
) => {
    const styleProperty = style === 'underline' || style === 'line-through' ? 'textDecoration' : 'fontStyle';

    const updatedShapes = canvasDesign.Shapes.map((shape) => {
        if (shape.id === canvasDesign.selectedId) {
            const textShape = shape as TextInputObj | TextFieldObj;
            const currentStyle = textShape[styleProperty] || '';
            const isStyleApplied = currentStyle.includes(style);
            textShape[styleProperty] = isStyleApplied
                ? currentStyle.replace(style, '').trim()
                : `${currentStyle} ${style}`.trim();

            return { ...textShape, [styleProperty]: textShape[styleProperty] };
        }
        else if (shape.type === "TextTable") {
            const textTable = shape as TextTableObj;
            const updatedRows = textTable.rows.map(row => 
                row.map(cell => {
                    if (cell.id === canvasDesign.selectedId) {
                        const currentStyle = cell[styleProperty] || '';
                        const isStyleApplied = currentStyle.includes(style);
                        cell[styleProperty] = isStyleApplied
                            ? currentStyle.replace(style, '').trim()
                            : `${currentStyle} ${style}`.trim();
                        return { ...cell, [styleProperty]: cell[styleProperty] };
                    }
                    return cell;
                })
            );
            return { ...textTable, rows: updatedRows };
        }
        return shape;
    });
    setCanvasDesign({
        ...canvasDesign,
        Shapes: updatedShapes,
    });
};



// Check if there are differences between the current and the database saved canvas designs
export const isTemplateChanged = (dataBaseCanvasDesign: CanvasDesignData, canvasDesign: CanvasDesignData, friendlyName:string, databaseFriendlyName:string) => {
    const canvasChanged = JSON.stringify(dataBaseCanvasDesign.Shapes) !== JSON.stringify(canvasDesign.Shapes);
    const friendlyNameChanged = friendlyName !== databaseFriendlyName;
    return canvasChanged || friendlyNameChanged;
}
