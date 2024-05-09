import React from 'react';
import { Button } from 'antd';
import { MdAlignHorizontalLeft, MdAlignHorizontalCenter, MdAlignHorizontalRight } from "react-icons/md";
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { updateShapeProperty } from '../../../../../utils/shapeManagementUtils';

interface TextAlignmentPickerProps {
    horizontalAlign: string;
    disabled?: boolean;
}

const TextAlignmentPicker: React.FC<TextAlignmentPickerProps> = ({ horizontalAlign, disabled }) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();

    const handleAlignmentChange = (newAlignment: string) => {
        if (newAlignment) {
            updateShapeProperty(canvasDesign, setCanvasDesign, 'horizontalAlign', newAlignment, selectedId);
        }
    };

    return (
        <div style={{ display: "flex" }}>
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