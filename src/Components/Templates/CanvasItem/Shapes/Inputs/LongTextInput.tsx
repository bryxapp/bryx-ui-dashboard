import { getTextWidthAndHeight } from '../../../../../utils/shapeManagementUtils';
import { LongTextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import InputContent from './SharedInputComponents/InputContent';

interface LongTextInputProps {
    longTextInputObj: LongTextInputObj;
    draggable?: boolean;
}

const LongTextInput = ({ longTextInputObj, draggable = true }: LongTextInputProps) => {
    const [contentShapeWidth, contentShapeHeight] = getTextWidthAndHeight(longTextInputObj, longTextInputObj.value);

    return (
        <InputContent
            inputObj={longTextInputObj}
            containerWidth={longTextInputObj.width}
            containerHeight={longTextInputObj.height}
            contentHeight={contentShapeHeight}
            contentWidth={contentShapeWidth}
            draggable={draggable}
            rotationEnabled={true}
            horizontalResizeEnabled={true}
            verticalResizeEnabled={true}
        />
    );
};

export default LongTextInput;