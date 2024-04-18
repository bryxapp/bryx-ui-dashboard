import { Input, Typography } from 'antd';
import { InputObj, ShapeObj } from '../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';

interface TextInputSizerProps {
    inputObj: InputObj;
    disabled?: boolean;
}

export default function TextInputSizer({ inputObj, disabled }: TextInputSizerProps) {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();

    const updateShapeProperty = (dimension: 'width' | 'height', event: any) => {
        let foundAndUpdated = false;

        const updatedShapes = canvasDesign.Shapes.map((shape: ShapeObj) => {
            const value = Math.round(event.target.value);
            // Skip any further updates after the first match is found and updated
            if (foundAndUpdated) return shape;

            // Update the matching shape directly
            if (shape.id === selectedId) {
                foundAndUpdated = true;
                const foundInputObj = shape as InputObj;
                const updatedInputObj = { ...foundInputObj, inputContentShape: { ...foundInputObj.inputContentShape, [dimension]: value } };
                return { ...updatedInputObj };
            }
            // Return the shape unchanged if no conditions are met
            return shape;
        });

        // Update the canvasDesign only if an update was made
        if (foundAndUpdated) {
            setCanvasDesign({ ...canvasDesign, Shapes: updatedShapes });
        }
    };

    const selectedWidth = Math.round(inputObj.inputContentShape.width);
    const selectedHeight = Math.round(inputObj.inputContentShape.height);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography.Text>Input Width</Typography.Text>
            <Input
                value={selectedWidth}
                onChange={(event) => updateShapeProperty('width', event)}
                size='small'
                disabled={disabled}
            />
            {inputObj.type === "LongTextInput" && (
                <>
                    <Typography.Text>Input Height</Typography.Text>
                    <Input
                        value={selectedHeight}
                        onChange={(event) => updateShapeProperty('height', event)}
                        size='small'
                        disabled={disabled}
                    />
                </>
            )}
        </div>
    );
}