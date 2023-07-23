import { CanvasDesignData, ShapeObj } from '../types/CanvasInterfaces';
import { generateShapeId } from '../id-util';

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
