import FontFamilyPicker from './FontFamilyPicker';
import FontSizePicker from './FontSizePicker';
import TextColorPicker from './TextColorPicker';
import TextAlignmentPicker from './TextAlignmentPicker';
import FontStylePicker from './FontStylePicker';
import FontDecorationPicker from './FontDecorationPicker';
import { TextBase } from '../../../../../utils/types/CanvasInterfaces';
import TextVerticalAlignmentPicker from './TextVerticalAlignmentPicker';
import { Divider, Typography } from 'antd';

interface TextPropertiesProps {
    textObj: TextBase;
    itemType: 'content' | 'label' | null;
    verticalAlign?: string;
    disabled?: boolean;
}

const TextProperties = ({ textObj, itemType, verticalAlign, disabled }: TextPropertiesProps) => {
    return (
        <>
            <Divider style={{ margin: ".3rem" }} />
            <Typography.Text>Style</Typography.Text>
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '.5rem', justifyContent: 'center', alignItems: 'center' }}>
                <FontFamilyPicker textObj={textObj} itemType={itemType} disabled={disabled} />
                <FontSizePicker textObj={textObj} itemType={itemType} disabled={disabled} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '.5rem', justifyContent: 'center', alignItems: 'center' }}>
                <TextColorPicker textObj={textObj} itemType={itemType} disabled={disabled} />
                <div style={{ width: '1rem' }} />
                <FontStylePicker textObj={textObj} itemType={itemType} disabled={disabled} />
                <FontDecorationPicker textObj={textObj} itemType={itemType} disabled={disabled} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TextAlignmentPicker textObj={textObj} itemType={itemType} disabled={disabled} />
                {verticalAlign &&
                    (
                        <>
                            <div style={{ width: '1rem' }} />
                            <TextVerticalAlignmentPicker verticalAlign={verticalAlign} disabled={disabled} />
                        </>
                    )}
            </div>
        </>
    );
};

export default TextProperties;