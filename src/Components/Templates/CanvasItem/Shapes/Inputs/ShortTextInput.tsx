
import { ShortTextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import InputContent from './SharedInputComponents/InputContent';
import { getTextWidthAndHeight } from '../../../../../utils/shapeManagementUtils';

interface ShortTextInputProps {
    shortTextInputObj: ShortTextInputObj;
    draggable?: boolean;
}

const ShortTextInput = ({ shortTextInputObj, draggable = true }: ShortTextInputProps) => {
    const [contentShapeWidth, contentShapeHeight] = getTextWidthAndHeight(shortTextInputObj);

    return (
        <InputContent
            inputObj={shortTextInputObj}
            contentHeight={contentShapeHeight}
            contentWidth={contentShapeWidth}
            draggable={draggable}
            rotationEnabled={true}
            horizontalResizeEnabled={true}
            verticalResizeEnabled={false}
        />
    );
};

export default ShortTextInput;