import React from 'react';
import { Button } from 'antd';
import { AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined } from '@ant-design/icons';
import { TextBase } from '../../../../../../../utils/types/CanvasInterfaces';
import { updateInputProperty, updateShapeProperty } from '../../../../../../../utils/shapeManagementUtils';
import { useCanvasDesignContext } from '../../../../../../../utils/contexts/canvasDesignContext';

interface TextAlignmentPickerProps {
    textObj: TextBase;
    itemType: 'content' | 'label' | null;
}

const TextAlignmentPicker: React.FC<TextAlignmentPickerProps> = ({ textObj, itemType }) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();
    
    const handleAlignmentChange = (newAlignment: string) => {
        if (newAlignment) {
            if (itemType === null)
                updateShapeProperty(canvasDesign, setCanvasDesign, 'align', newAlignment, selectedId);
            else {
                updateInputProperty(canvasDesign, setCanvasDesign, itemType, 'align', newAlignment, selectedId);
            }
        }
    };

    return (
        <>
            <Button
                type={textObj.align === 'left' ? 'primary' : 'default'}
                icon={<AlignLeftOutlined />}
                onClick={() => handleAlignmentChange('left')}
                size="small"
            />
            <Button
                type={textObj.align === 'center' ? 'primary' : 'default'}
                icon={<AlignCenterOutlined />}
                onClick={() => handleAlignmentChange('center')}
                size="small"
            />
            <Button
                type={textObj.align === 'right' ? 'primary' : 'default'}
                icon={<AlignRightOutlined />}
                onClick={() => handleAlignmentChange('right')}
                size="small"
            />
        </>
    );
};

export default TextAlignmentPicker;