import { Transformer } from 'react-konva';

interface InputTransformerProps {
    trRef: any;
    onTransformEnd: any;
    rotationEnabled: boolean;
    horizontalResizeEnabled: boolean;
    verticalResizeEnabled: boolean;
}

export const MIN_BOX_SIZE = 5;
export const ROTATION_SNAPS = [0, 45, 90, 135, 180, 225, 270];

const ShapeTransformer = ({ trRef, onTransformEnd, rotationEnabled, horizontalResizeEnabled, verticalResizeEnabled }: InputTransformerProps) => {
    return (
        <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
                // Adjust width if horizontal resizing is enabled
                if (horizontalResizeEnabled) {
                    if (newBox.width < MIN_BOX_SIZE) {
                        newBox.width = MIN_BOX_SIZE;
                    }
                } else {
                    // Lock width if horizontal resizing is not enabled
                    newBox.width = oldBox.width;
                }

                // Adjust height if vertical resizing is enabled
                if (verticalResizeEnabled) {
                    if (newBox.height < MIN_BOX_SIZE) {
                        newBox.height = MIN_BOX_SIZE;
                    }
                } else {
                    // Lock height if vertical resizing is not enabled
                    newBox.height = oldBox.height;
                }

                return newBox;
            }}
            onTransformEnd={onTransformEnd}
            rotateEnabled={rotationEnabled}
            anchorSize={10}
            resizeEnabled={horizontalResizeEnabled || verticalResizeEnabled}
            keepRatio={false}  // This will allow independent resizing without keeping the ratio
            rotationSnaps={ROTATION_SNAPS}
        />
    );
};

export default ShapeTransformer;