import { Card } from 'antd';
import { TextBase } from '../../../../../utils/types/CanvasInterfaces';
import TextProperties from './TextProperties';

interface TextPropertiesCardProps {
    textObj: TextBase;
    itemType: 'content' | 'label' | null;
    disabled?: boolean;
}

const TextPropertiesCard = ({ textObj, itemType, disabled }: TextPropertiesCardProps) => {
    return (
        <Card>
            <TextProperties textObj={textObj} itemType={itemType} disabled={disabled} />
        </Card>
    );
};

export default TextPropertiesCard;