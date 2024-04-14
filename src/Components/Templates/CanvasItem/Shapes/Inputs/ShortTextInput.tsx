import { Rect, Group } from 'react-konva';
import { ShortTextInputObj, TextBase } from '../../../../../utils/types/CanvasInterfaces';
import React, { useRef, useEffect } from 'react';
import Konva from 'konva';
import InputLabel from './SharedInputComponents/InputLabel';
import InputContent from './SharedInputComponents/InputContent';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import ShapeTransformer from '../SharedShapeComponents/ShapeTransformer';

interface ShortTextInputProps {
    shortTextInputObj: ShortTextInputObj;
    handleDragStart: any;
    handleDragEnd: any;
    onTransformEnd: any;
    handleDragMove: any;
    draggable?: boolean;
}

const ShortTextInput = ({ shortTextInputObj, handleDragStart, handleDragEnd, onTransformEnd, handleDragMove, draggable = true }: ShortTextInputProps) => {
    const shapeRef = useRef<Konva.Group>(null);
    const trRef = useRef<Konva.Transformer>(null);
    const { selectedId, setSelectedId } = useCanvasDesignContext();
    const isSelected = shortTextInputObj.id === selectedId;
    const onSelect = () => {
        setSelectedId(shortTextInputObj.id);
    }
    const createTempTextKonvaShape = (content: TextBase) => new Konva.Text({
        text: content.value,
        fontSize: content.fontSize,
        fontFamily: content.fontFamily,
        fontStyle: content.fontStyle,
        textDecoration: content.textDecoration,
        align: content.align,
    });

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
    }, [shortTextInputObj, isSelected]);

    //Create Label Text Shape for measurements
    const tempTextShapeLabel = createTempTextKonvaShape(shortTextInputObj.label);
    const labelShapeWidth = tempTextShapeLabel.width();
    const labelShapeHeight = tempTextShapeLabel.height();

    //Create Content Text Shape for measurements

    const tempTextShapeContent = createTempTextKonvaShape(shortTextInputObj.content);
    const contentShapeWidth = tempTextShapeContent.width();
    const contentShapeHeight = tempTextShapeContent.height();

    const containerHeight = shortTextInputObj.hasLabel ? contentShapeHeight + labelShapeHeight : contentShapeHeight;
    const containerWidth = Math.max(labelShapeWidth, contentShapeWidth);


    return (
        <React.Fragment>
            <Group
                key={shortTextInputObj.id}
                id={shortTextInputObj.id}
                displayName={shortTextInputObj.label}
                x={shortTextInputObj.x}
                y={shortTextInputObj.y}
                draggable={draggable}
                onDragMove={handleDragMove}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                ref={shapeRef}
                rotation={shortTextInputObj.rotation}
                onClick={onSelect}
                onTap={onSelect}
            >
                {/* Background Rectangle for easier selecting and dragging */}
                <Rect
                    width={containerWidth}
                    height={containerHeight - labelShapeHeight}
                    fill='transparent'
                    onClick={onSelect}
                    onTap={onSelect} />

                {/* Input Label */}
                {shortTextInputObj.hasLabel && (
                    <InputLabel textObj={shortTextInputObj.label} contentHeight={contentShapeHeight} containerWidth={containerWidth} inputObjId={shortTextInputObj.id} />
                )}

                {/* Input Content */}
                <InputContent
                    textObj={shortTextInputObj.content}
                    containerWidth={containerWidth}
                    contentHeight={contentShapeHeight}
                    contentWidth={contentShapeWidth}
                    labelHeight={shortTextInputObj.hasLabel ? labelShapeHeight : 0}
                    labelFontSize={shortTextInputObj.hasLabel ? shortTextInputObj.label.fontSize : 0}
                    onSelect={onSelect} />
            </Group>
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
        </React.Fragment>
    );
};

export default ShortTextInput;