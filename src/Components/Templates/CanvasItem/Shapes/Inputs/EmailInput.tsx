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
    const containerHeight = contentShapeHeight;
    const containerWidth = contentShapeWidth;

    return (
        <InputContent
            inputObj={emailInputObj}
            containerWidth={containerWidth}
            inputHeight={contentShapeHeight}
            inputWidth={emailInputObj.width}
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

export default EmailInput;