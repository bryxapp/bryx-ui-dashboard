import FontFamilyPicker from './FontFamilyPicker';
import FontSizePicker from './FontSizePicker';
import TextColorPicker from './TextColorPicker';
import FontStylePicker from './FontStylePicker';
import FontDecorationPicker from './FontDecorationPicker';
import { TextBase } from '../../../../../utils/types/CanvasInterfaces';
import { Divider, Typography } from 'antd';

interface TextPropertiesProps {
    textObj: TextBase;
    disabled?: boolean;
}

const TextProperties = ({ textObj, disabled }: TextPropertiesProps) => {
    return (
        <>
            <Divider style={{ margin: ".3rem" }} />
            <Typography.Text>Style</Typography.Text>
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '.5rem', justifyContent: 'center', alignItems: 'center' }}>
                <FontFamilyPicker textObj={textObj} disabled={disabled} />
                <FontSizePicker textObj={textObj} disabled={disabled} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '.5rem', justifyContent: 'center', alignItems: 'center' }}>
                <TextColorPicker textObj={textObj} disabled={disabled} />
                <div style={{ width: '1rem' }} />
                <FontStylePicker textObj={textObj} disabled={disabled} />
                <FontDecorationPicker textObj={textObj} disabled={disabled} />
            </div>
        </>
    );
};

export default TextProperties;