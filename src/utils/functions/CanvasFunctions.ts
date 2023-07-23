import { CanvasDesignData, ShapeObj } from '../types/CanvasInterfaces';

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
