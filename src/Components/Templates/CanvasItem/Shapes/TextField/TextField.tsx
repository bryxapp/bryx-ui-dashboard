import { textFieldObj } from '../../../../../Utils/types/ShapeInterfaces';
import { Html } from 'react-konva-utils';

interface TextFieldProps {
    textFieldObj: textFieldObj;
    handleDragStart: any;
    handleDragEnd: any;
    canvasDesign: any;
    setCanvasDesign: any
}

const TextField = ({ textFieldObj, handleDragStart, handleDragEnd, canvasDesign, setCanvasDesign }: TextFieldProps) => {
    const style: React.CSSProperties = {
        width: `${textFieldObj.width}px`,
        height: `${textFieldObj.height}px`,
        border: "none",
        background: "none",
        outline: "none",
        resize: "none",
        color: `${textFieldObj.fontColor}`,
        fontSize: `${textFieldObj.fontSize}`,
        fontFamily: "sans-serif",
    };

    const onChange = (event: any) => {
        const shapeTypes = Object.keys(canvasDesign);
        const updatedCanvasDesign: any = {};
        shapeTypes.forEach(shapeType => {
            if (shapeType === "selectedId") return;
            updatedCanvasDesign[shapeType] = canvasDesign[shapeType].map((shape: any) => {
                return {
                    ...shape,
                    value: shape.id === textFieldObj.id ? event.target.value : shape.value,
                };
            });
        });
        setCanvasDesign(updatedCanvasDesign);
    };

    const x = textFieldObj.x;
    const y = textFieldObj.y;
    return (
        <Html groupProps={{ x, y }}>
            <textarea
                onChange={onChange}
                style={style}
                id={textFieldObj.id}
                value={textFieldObj.value}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                draggable
            />
        </Html>
    );
};

export default TextField;