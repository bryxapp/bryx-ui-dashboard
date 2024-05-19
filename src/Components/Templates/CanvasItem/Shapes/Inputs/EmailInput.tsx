import { EmailInputObj } from '../../../../../utils/types/CanvasInterfaces';
import InputContent from './SharedInputComponents/InputContent';
import { getEmailTextWidthAndHeight } from '../../../../../utils/shapeManagementUtils';
interface EmailInputProps {
    emailInputObj: EmailInputObj;
    draggable?: boolean;
}

const EmailInput = ({ emailInputObj, draggable = true }: EmailInputProps) => {
    const [contentShapeWidth, contentShapeHeight] = getEmailTextWidthAndHeight(emailInputObj);
    
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