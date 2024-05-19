import { PhoneInputObj } from '../../../../../utils/types/CanvasInterfaces';
import InputContent from './SharedInputComponents/InputContent';
import { getTextWidthAndHeight } from '../../../../../utils/shapeManagementUtils';

const PHONE_NUMBER_LENGTH = 10;
interface PhoneInputProps {
    phoneInputObj: PhoneInputObj;
    handleDragEnd: any;
    onTransformEnd: any;
    handleDragMove: any;
    draggable?: boolean;
}

const PhoneInput = ({ phoneInputObj, draggable = true }: PhoneInputProps) => {
    const [contentShapeWidth, contentShapeHeight] = getTextWidthAndHeight(phoneInputObj, 'X'.repeat(PHONE_NUMBER_LENGTH));
    const containerHeight = contentShapeHeight;
    const containerWidth = contentShapeWidth;

    return (
        <InputContent
            inputObj={phoneInputObj}
            containerWidth={containerWidth}
            inputHeight={contentShapeHeight}
            inputWidth={phoneInputObj.width}
            contentHeight={contentShapeHeight}
            contentWidth={contentShapeWidth}
            draggable={draggable}
            containerHeight={containerHeight}
            rotationEnabled={true}
            horizontalResizeEnabled={false}
            verticalResizeEnabled={false}
        />
    );
};

export default PhoneInput;