import { Rect, Group, Text } from 'react-konva';
import React, { useRef, useEffect } from 'react';
import Konva from 'konva';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';
import ShapeTransformer from '../../SharedShapeComponents/ShapeTransformer';
import { FILL_COLOR, createTempTextKonvaShape, getXAlignment, getYAlignment } from '../SharedInputComponents/InputHelper';
import { CellInputObj, HorizontalAlign, VerticalAlign } from '../../../../../../utils/types/CanvasInterfaces';

interface InputCellProps {
    cellInputObj: CellInputObj;
    containerWidth: number;
    containerHeight: number;
    horizontalAlign: HorizontalAlign
    verticalAlign: VerticalAlign
}

const InputCell = ({ cellInputObj, containerWidth, containerHeight, horizontalAlign, verticalAlign }: InputCellProps) => {
    const shapeRef = useRef<Konva.Group>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const { selectedId, setSelectedId } = useCanvasDesignContext();
    const isSelected = cellInputObj.id === selectedId;
    const onSelect = () => {
        setSelectedId(cellInputObj.id);
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
    }, [cellInputObj, isSelected]);

    //Create Content Text Shape for measurements
    const tempTextShapeContent = createTempTextKonvaShape(cellInputObj, cellInputObj.value);

    return (
        <React.Fragment>
            <Group
                key={cellInputObj.id}
                id={cellInputObj.id}
                x={cellInputObj.x}
                y={cellInputObj.y}
                draggable={false}
                ref={shapeRef}
                onClick={onSelect}
                onTap={onSelect}
            >
                <Rect
                    x={0}
                    y={0}
                    width={containerWidth}
                    height={containerHeight}
                    fill={FILL_COLOR}
                    onClick={onSelect}
                    onTap={onSelect}
                />
                <Text
                    x={getXAlignment(tempTextShapeContent.width(), horizontalAlign, containerWidth)}
                    y={getYAlignment(tempTextShapeContent.height(), verticalAlign, containerHeight)}
                    text={`${cellInputObj.value}`}
                    fontSize={cellInputObj.fontSize}
                    fill={cellInputObj.fill}
                    fontFamily={cellInputObj.fontFamily}
                    fontStyle={cellInputObj.fontStyle}
                    textDecoration={cellInputObj.textDecoration}
                    scaleX={1}
                    scaleY={1}
                />
            </Group>
            {isSelected && (
                <>
                    <ShapeTransformer
                        trRef={trRef}
                        onTransformEnd={() => { }}
                        rotationEnabled={true}
                        resizeEnabled={false}
                        keepRatio={true}
                    />
                </>
            )}
        </React.Fragment>
    );
};

export default InputCell;