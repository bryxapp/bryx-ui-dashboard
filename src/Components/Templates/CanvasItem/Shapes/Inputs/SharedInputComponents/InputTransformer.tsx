import { Transformer } from 'react-konva';
import { MIN_BOX_SIZE, ROTATION_SNAPS } from './InputHelper';

interface InputTransformerProps {
    trRef: any
    onTransformEnd: any
}

const InputTransformer = ({ trRef, onTransformEnd }: InputTransformerProps) => {
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
            rotateEnabled={true}
            anchorSize={10}
            resizeEnabled={false}
            keepRatio={false}
            rotationSnaps={ROTATION_SNAPS}
        />
    );
};

export default InputTransformer;