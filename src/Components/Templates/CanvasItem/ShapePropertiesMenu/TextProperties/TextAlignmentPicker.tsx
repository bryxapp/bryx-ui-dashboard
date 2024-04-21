import React from 'react';
import { Button } from 'antd';
import { MdAlignHorizontalLeft, MdAlignHorizontalCenter, MdAlignHorizontalRight } from "react-icons/md";
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { updateInputProperty, updateShapeProperty } from '../../../../../utils/shapeManagementUtils';

interface TextAlignmentPickerProps {
    horizontalAlign: string;
    itemType: 'content' | 'label' | null;
    disabled?: boolean;
}

const TextAlignmentPicker: React.FC<TextAlignmentPickerProps> = ({ horizontalAlign, itemType, disabled }) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();
    
    const handleAlignmentChange = (newAlignment: string) => {
        if (newAlignment) {
            if (itemType === null)
                updateShapeProperty(canvasDesign, setCanvasDesign, 'horizontalAlign', newAlignment, selectedId);
            else {
                updateInputProperty(canvasDesign, setCanvasDesign, itemType, 'horizontalAlign', newAlignment, selectedId);
            }
        }
    };

    return (
        <div style={{display:"flex"}}>
            <Button
                type={horizontalAlign === 'left' ? 'primary' : 'default'}
                icon={<MdAlignHorizontalLeft />}
                onClick={() => handleAlignmentChange('left')}
                size="small"
                disabled={disabled}
            />
            <Button
                type={horizontalAlign === 'center' ? 'primary' : 'default'}
                icon={<MdAlignHorizontalCenter />}
                onClick={() => handleAlignmentChange('center')}
                size="small"
                disabled={disabled}
            />
            <Button
                type={horizontalAlign === 'right' ? 'primary' : 'default'}
                icon={<MdAlignHorizontalRight />}
                onClick={() => handleAlignmentChange('right')}
                size="small"
                disabled={disabled}
            />
        </div>
    );
};

export default TextAlignmentPicker;