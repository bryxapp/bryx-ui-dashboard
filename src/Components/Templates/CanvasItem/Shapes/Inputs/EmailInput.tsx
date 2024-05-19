import { EmailInputObj } from '../../../../../utils/types/CanvasInterfaces';
import InputContent from './SharedInputComponents/InputContent';
import { getTextWidthAndHeight } from '../../../../../utils/shapeManagementUtils';

const EMAIL_LENGTH = 20;
interface EmailInputProps {
    emailInputObj: EmailInputObj;
    draggable?: boolean;
}

const EmailInput = ({ emailInputObj, draggable = true }: EmailInputProps) => {
    const [contentShapeWidth, contentShapeHeight] = getTextWidthAndHeight(emailInputObj, 'X'.repeat(EMAIL_LENGTH));
    
    return (
        <InputContent
            inputObj={emailInputObj}
            contentHeight={contentShapeHeight}
            contentWidth={contentShapeWidth}
            draggable={draggable}
            rotationEnabled={true}
            horizontalResizeEnabled={false}
            verticalResizeEnabled={false}
        />
    );
};

export default EmailInput;