import React, { useState } from 'react';
import { Button, Dropdown, Menu, Tooltip } from 'antd';
import FontSizeSelectorIcon from '@mui/icons-material/FormatColorText';
import FontSizePicker from './FontSizePicker';
import FontFamilyPicker from './FontFamilyPicker';
import FontStylePicker from './FontStylePicker';
import FontDecorationPicker from './FontDecorationPicker';
import TextAlignmentPicker from './TextAlignmentPicker';
import TextColorPicker from './TextColorPicker';
import { TextBase } from '../../../../../../utils/types/CanvasInterfaces';

interface TextPropertiesMenuProps {
    textObj: TextBase;
    itemType: 'content' | 'label' | null;
}

const TextPropertiesMenu: React.FC<TextPropertiesMenuProps> = ({ textObj, itemType }) => {
    const [visible, setVisible] = useState<boolean>(false);

    const handleVisibleChange = (flag: boolean) => {
        setVisible(flag);
    };

    const menu = (
        <Menu
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0 10px 0 10px',
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '.5rem', justifyContent: 'space-evenly' }}>
                <FontFamilyPicker textObj={textObj} itemType={itemType} />
                <FontSizePicker textObj={textObj} itemType={itemType} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '1rem' }}>
                <TextColorPicker textObj={textObj} itemType={itemType} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <FontStylePicker textObj={textObj} itemType={itemType} />
                <FontDecorationPicker textObj={textObj} itemType={itemType} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
                <TextAlignmentPicker textObj={textObj} itemType={itemType} />
            </div>
        </Menu>
    );

    return (
        <Dropdown
            overlay={menu}
            trigger={['click']}
            visible={visible}
            onVisibleChange={handleVisibleChange}
        >
            <Tooltip title="Change Text Style" placement="bottom">
                <Button style={{ color: textObj.fill }} icon={<FontSizeSelectorIcon />} />
            </Tooltip>
        </Dropdown>
    );
};

export default TextPropertiesMenu;