import { LongTextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import InputContent from './SharedInputComponents/InputContent';

interface LongTextInputProps {
    longTextInputObj: LongTextInputObj;
}

const LongTextInput = ({ longTextInputObj }: LongTextInputProps) => {
    return (
        <InputContent
            inputObj={longTextInputObj}
            rotationEnabled={true}
            horizontalResizeEnabled={true}
            verticalResizeEnabled={true}
        />
    );
};

export default LongTextInput;