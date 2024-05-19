import { LongTextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import InputContent from './SharedInputComponents/InputContent';
import { createTempTextKonvaShape } from './SharedInputComponents/InputHelper';

interface LongTextInputProps {
    longTextInputObj: LongTextInputObj;
    draggable?: boolean;
}

const LongTextInput = ({ longTextInputObj, draggable = true }: LongTextInputProps) => {
    //Create Content Text Shape for measurements
    const tempTextShapeContent = createTempTextKonvaShape(longTextInputObj, longTextInputObj.value);
    const contentShapeWidth = Math.max(tempTextShapeContent.width(), longTextInputObj.width);
    const contentShapeHeight = Math.max(tempTextShapeContent.height(), longTextInputObj.height);
    const containerWidth = Math.max(contentShapeWidth, longTextInputObj.width);
    const containerHeight = Math.max(contentShapeHeight, longTextInputObj.height);

    return (
        <InputContent
            inputObj={longTextInputObj}
            containerWidth={containerWidth}
            inputHeight={contentShapeHeight}
            inputWidth={longTextInputObj.width}
            contentHeight={contentShapeHeight}
            contentWidth={contentShapeWidth}
            draggable={draggable}
            containerHeight={containerHeight}
            rotationEnabled={true}
            horizontalResizeEnabled={true}
            verticalResizeEnabled={true}
        />
    );
};

export default LongTextInput;