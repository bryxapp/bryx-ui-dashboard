import { Card } from 'antd';
import { ParagraphObj, TextObj } from '../../../../../utils/types/CanvasInterfaces';
import TextProperties from './TextProperties';
import TextAlignmentPicker from './TextAlignmentPicker';

interface TextPropertiesCardProps {
    textObj: TextObj;
    disabled?: boolean;
}

const TextPropertiesCard = ({ textObj, disabled }: TextPropertiesCardProps) => {
    let horizontalAlign = '';
    if (textObj.type === 'Paragraph') {
        const paragraphObj = textObj as ParagraphObj;
        horizontalAlign = paragraphObj.horizontalAlign;
    }
    return (
        <Card>
            <TextProperties textObj={textObj} disabled={disabled} />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                {horizontalAlign && (
                    <TextAlignmentPicker horizontalAlign={horizontalAlign} disabled={disabled} />
                )}
            </div>
        </Card>
    );
};

export default TextPropertiesCard;