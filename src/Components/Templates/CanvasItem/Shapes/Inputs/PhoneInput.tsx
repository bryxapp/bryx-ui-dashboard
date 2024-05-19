import { PhoneInputObj } from '../../../../../utils/types/CanvasInterfaces';
import InputContent from './SharedInputComponents/InputContent';
import { getTextWidthAndHeight } from '../../../../../utils/shapeManagementUtils';

interface PhoneInputProps {
    phoneInputObj: PhoneInputObj;
    handleDragEnd: any;
    onTransformEnd: any;
    handleDragMove: any;
    draggable?: boolean;
}

const PhoneInput = ({ phoneInputObj, draggable = true }: PhoneInputProps) => {
    const [phoneTextWidth, phoneTextHeight] = getTextWidthAndHeight(phoneInputObj);

    return (
        <InputContent
            inputObj={phoneInputObj}
            contentHeight={phoneTextWidth}
            contentWidth={phoneTextHeight}
            draggable={draggable}
            rotationEnabled={true}
            horizontalResizeEnabled={false}
            verticalResizeEnabled={false}
        />
    );
};

export default PhoneInput;