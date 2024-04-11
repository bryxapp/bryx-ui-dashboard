import { Card } from 'antd';
import FontFamilyPicker from './FontFamilyPicker';
import FontSizePicker from './FontSizePicker';
import TextColorPicker from './TextColorPicker';
import TextAlignmentPicker from './TextAlignmentPicker';
import FontStylePicker from './FontStylePicker';
import FontDecorationPicker from './FontDecorationPicker';
import { TextBase } from '../../../../../utils/types/CanvasInterfaces';

interface TextPropertiesProps {
    textObj: TextBase;
    itemType: 'content' | 'label' | null;
}


const TextProperties = ({ textObj, itemType }: TextPropertiesProps) => {
    return (
        <Card >
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '.5rem', justifyContent: 'center', alignItems: 'center' }}>
                <FontFamilyPicker textObj={textObj} itemType={itemType} />
                <FontSizePicker textObj={textObj} itemType={itemType} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '1rem', justifyContent: 'space-evenly', alignItems: 'center' }}>
                <TextColorPicker textObj={textObj} itemType={itemType} />
                <TextAlignmentPicker textObj={textObj} itemType={itemType} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <FontStylePicker textObj={textObj} itemType={itemType} />
                <FontDecorationPicker textObj={textObj} itemType={itemType} />
            </div>
        </Card>
    );
};

export default TextProperties;

