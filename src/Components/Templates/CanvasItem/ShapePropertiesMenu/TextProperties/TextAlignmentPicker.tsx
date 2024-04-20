import React from 'react';
import { Button } from 'antd';
import { MdAlignHorizontalLeft, MdAlignHorizontalCenter, MdAlignHorizontalRight } from "react-icons/md";
import { TextBase } from '../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { updateInputProperty, updateShapeProperty } from '../../../../../utils/shapeManagementUtils';

interface TextAlignmentPickerProps {
    textObj: TextBase;
    itemType: 'content' | 'label' | null;
    disabled?: boolean;
}

const TextAlignmentPicker: React.FC<TextAlignmentPickerProps> = ({ textObj, itemType, disabled }) => {
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
        <div style={{display:"flex"}}>
            <Button
                type={textObj.horizontalAlign === 'left' ? 'primary' : 'default'}
                icon={<MdAlignHorizontalLeft />}
                onClick={() => handleAlignmentChange('left')}
                size="small"
                disabled={disabled}
            />
            <Button
                type={textObj.horizontalAlign === 'center' ? 'primary' : 'default'}
                icon={<MdAlignHorizontalCenter />}
                onClick={() => handleAlignmentChange('center')}
                size="small"
                disabled={disabled}
            />
            <Button
                type={textObj.horizontalAlign === 'right' ? 'primary' : 'default'}
                icon={<MdAlignHorizontalRight />}
                onClick={() => handleAlignmentChange('right')}
                size="small"
                disabled={disabled}
            />
        </div>
    );
};

export default TextAlignmentPicker;