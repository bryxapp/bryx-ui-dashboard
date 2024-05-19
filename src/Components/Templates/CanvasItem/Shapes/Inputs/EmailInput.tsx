import { EmailInputObj } from '../../../../../utils/types/CanvasInterfaces';
import InputContent from './SharedInputComponents/InputContent';
interface EmailInputProps {
    emailInputObj: EmailInputObj;
}

const EmailInput = ({ emailInputObj}: EmailInputProps) => {   
    return (
        <InputContent
            inputObj={emailInputObj}
            rotationEnabled={true}
            horizontalResizeEnabled={false}
            verticalResizeEnabled={false}
        />
    );
};

export default EmailInput;