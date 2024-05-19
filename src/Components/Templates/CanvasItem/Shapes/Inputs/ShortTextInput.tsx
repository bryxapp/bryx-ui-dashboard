
import { ShortTextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import InputContent from './SharedInputComponents/InputContent';
import { getTextWidthAndHeight } from '../../../../../utils/shapeManagementUtils';

interface ShortTextInputProps {
    shortTextInputObj: ShortTextInputObj;
    draggable?: boolean;
}

const ShortTextInput = ({ shortTextInputObj, draggable = true }: ShortTextInputProps) => {
    const [contentShapeWidth, contentShapeHeight] = getTextWidthAndHeight(shortTextInputObj, shortTextInputObj.value);
    const containerHeight = contentShapeHeight;
    const containerWidth = Math.max(contentShapeWidth, shortTextInputObj.width);

    return (
        <InputContent
            inputObj={shortTextInputObj}
            containerWidth={containerWidth}
            inputHeight={contentShapeHeight}
            inputWidth={shortTextInputObj.width}
            contentHeight={contentShapeHeight}
            contentWidth={contentShapeWidth}
            draggable={draggable}
            containerHeight={containerHeight}
            rotationEnabled={true}
            horizontalResizeEnabled={true}
            verticalResizeEnabled={false}
        />
    );
};

export default ShortTextInput;