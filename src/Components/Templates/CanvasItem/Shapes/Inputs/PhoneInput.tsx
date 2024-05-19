import { PhoneInputObj } from '../../../../../utils/types/CanvasInterfaces';
import InputContent from './SharedInputComponents/InputContent';

interface PhoneInputProps {
    phoneInputObj: PhoneInputObj;
}

const PhoneInput = ({ phoneInputObj }: PhoneInputProps) => {
    return (
        <InputContent
            inputObj={phoneInputObj}
            rotationEnabled={true}
            horizontalResizeEnabled={false}
            verticalResizeEnabled={false}
        />
    );
};

export default PhoneInput;