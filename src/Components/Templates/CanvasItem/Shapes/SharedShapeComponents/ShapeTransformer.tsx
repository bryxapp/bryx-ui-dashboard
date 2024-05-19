import { Transformer } from 'react-konva';
import { ShapeObj } from '../../../../../utils/types/CanvasInterfaces';
import { getTransformerProperties } from '../../../../../utils/shapeManagementUtils';

interface InputTransformerProps {
    shapeObj: ShapeObj
    trRef: any;
    onTransformEnd?: any;
    onTransform?: any;
}

export const MIN_BOX_SIZE = 5;
export const ROTATION_SNAPS = [0, 45, 90, 135, 180, 225, 270];

const ShapeTransformer = ({ shapeObj, trRef, onTransformEnd, onTransform }: InputTransformerProps) => {
    const [rotationEnabled, horizontalResizeEnabled, verticalResizeEnabled] = getTransformerProperties(shapeObj);
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
            onTransform={onTransform}
        />
    );
};

export default ShapeTransformer;