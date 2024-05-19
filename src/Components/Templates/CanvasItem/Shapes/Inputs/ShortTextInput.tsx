
import { ShortTextInputObj } from '../../../../../utils/types/CanvasInterfaces';
import InputContent from './SharedInputComponents/InputContent';

interface ShortTextInputProps {
    shortTextInputObj: ShortTextInputObj;
}

const ShortTextInput = ({ shortTextInputObj }: ShortTextInputProps) => {

    return (
        <InputContent
            inputObj={shortTextInputObj}
            rotationEnabled={true}
            horizontalResizeEnabled={true}
            verticalResizeEnabled={false}
        />
    );
};

export default ShortTextInput;