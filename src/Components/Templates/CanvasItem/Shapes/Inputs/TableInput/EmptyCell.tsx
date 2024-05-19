import { Rect, Group } from 'react-konva';
import React, { useRef, useEffect } from 'react';
import Konva from 'konva';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';
import ShapeTransformer from '../../SharedShapeComponents/ShapeTransformer';
import { TableCellObj } from '../../../../../../utils/types/CanvasInterfaces';

interface InputCellProps {
    emptyCellObj: TableCellObj;
    containerWidth: number;
    containerHeight: number;
}

const EmptyCell = ({ emptyCellObj, containerWidth, containerHeight }: InputCellProps) => {
    const shapeRef = useRef<Konva.Group>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const { selectedId, setSelectedId } = useCanvasDesignContext();
    const isSelected = emptyCellObj.id === selectedId;
    const onSelect = () => {
        setSelectedId(emptyCellObj.id);
    }

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
    }, [emptyCellObj, isSelected]);

    return (
        <React.Fragment>
            <Group
                key={emptyCellObj.id}
                id={emptyCellObj.id}
                x={emptyCellObj.x + 2}
                y={emptyCellObj.y + 2}
                draggable={false}
                ref={shapeRef}
                onClick={onSelect}
                onTap={onSelect}
            >
                <Rect
                    x={0}
                    y={0}
                    width={containerWidth - 4}
                    height={containerHeight - 4}
                    onClick={onSelect}
                    onTap={onSelect}
                />
            </Group>
            {isSelected && (
                <>
                    <ShapeTransformer
                        shapeObj={emptyCellObj}
                        trRef={trRef}
                        onTransformEnd={() => { }}
                    />
                </>
            )}
        </React.Fragment>
    );
}

export default EmptyCell;