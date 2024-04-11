import { Text } from 'react-konva';
import { TableInputObj } from '../../../../../../utils/types/CanvasInterfaces';
import { useRef, useEffect } from 'react';
import Konva from 'konva';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';
import ShapeTransformer from '../../SharedShapeComponents/ShapeTransformer';

interface TableInputProps {
    tableInputObj: TableInputObj;
    handleDragStart: any;
    handleDragEnd: any;
    onTransformEnd: any;
    handleDragMove: any;
    draggable?: boolean;
}

const TableInput = ({ tableInputObj, handleDragStart, handleDragEnd, onTransformEnd, handleDragMove, draggable = true }: TableInputProps) => {
    const { selectedId, setSelectedId } = useCanvasDesignContext();
    const isSelected = tableInputObj.id === selectedId;
    const onSelect = () => {
        setSelectedId(tableInputObj.id);
    }
    const shapeRef = useRef<Konva.Group>(null);
    const trRef = useRef<Konva.Transformer>(null);

    useEffect(() => {
        if (isSelected && shapeRef.current) {
            // we need to attach transformer manually
            trRef.current?.nodes([shapeRef.current]);
            trRef.current?.getLayer()?.batchDraw();
        }
    }, [isSelected]);

    useEffect(() => {
        // This effect will re-run whenever shortTextInputObj changes.
        if (shapeRef.current && trRef.current) {
            // Directly update the size of the Konva elements based on the new shortTextInputObj properties.
            // You might want to recalculate your sizes here similar to what is done outside useEffect.
            // Then, update the transformer if it is selected.
            if (isSelected) {
                trRef.current.nodes([shapeRef.current]);
                trRef.current.getLayer()?.batchDraw();
            }
        }
    }, [tableInputObj, isSelected]);

    return (
        <>
            <Text
                text={"TABLE"}
                x={tableInputObj.x}
                y={tableInputObj.y}
                draggable={draggable}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onTransformEnd={onTransformEnd}
                onDragMove={handleDragMove}
                onClick={onSelect}
            />
            {isSelected && (
                <>
                    <ShapeTransformer
                        trRef={trRef}
                        onTransformEnd={onTransformEnd}
                        rotationEnabled={true}
                        resizeEnabled={false}
                        keepRatio={true}
                    />
                </>
            )}
        </>
    );
};

export default TableInput;