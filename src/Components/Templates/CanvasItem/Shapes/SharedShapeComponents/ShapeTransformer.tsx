import { Transformer } from 'react-konva';

interface InputTransformerProps {
    trRef: any
    onTransformEnd: any
    rotationEnabled: boolean
    resizeEnabled: boolean
    keepRatio: boolean
}

export const MIN_BOX_SIZE = 5;
export const ROTATION_SNAPS = [0, 45, 90, 135, 180, 225, 270];

const ShapeTransformer = ({ trRef, onTransformEnd, rotationEnabled, resizeEnabled, keepRatio }: InputTransformerProps) => {
    return (
        <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
                // limit resize
                if (newBox.width < MIN_BOX_SIZE || newBox.height < MIN_BOX_SIZE) {
                    return oldBox;
                }
                return newBox;
            }}
            onTransformEnd={onTransformEnd}
            rotateEnabled={rotationEnabled}
            anchorSize={10}
            resizeEnabled={resizeEnabled}
            keepRatio={keepRatio}
            rotationSnaps={ROTATION_SNAPS}
        />
    );
};

export default ShapeTransformer;