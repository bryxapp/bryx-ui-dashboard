import React from 'react';
import { Button } from 'antd';
import { MdAlignVerticalBottom, MdAlignVerticalTop, MdOutlineAlignVerticalCenter } from "react-icons/md";
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { updateShapeProperty } from '../../../../../utils/shapeManagementUtils';

interface TextAlignmentPickerProps {
    verticalAlign: string;
    disabled?: boolean;
}

const TextVerticalAlignmentPicker: React.FC<TextAlignmentPickerProps> = ({ verticalAlign, disabled }) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();

    const handleVerticalAlignmentChange = (newAlignment: string) => {
        if (newAlignment) {
            updateShapeProperty(canvasDesign, setCanvasDesign, 'verticalAlign', newAlignment, selectedId);
        }
    };

    return (
        <div style={{ display: "flex" }}>
            <Button
                type={verticalAlign === 'top' ? 'primary' : 'default'} // Corrected alignment check
                icon={<MdAlignVerticalTop />}
                onClick={() => handleVerticalAlignmentChange('top')}
                size="small"
                disabled={disabled}
            />
            <Button
                type={verticalAlign === 'middle' ? 'primary' : 'default'} // Corrected alignment check
                icon={<MdOutlineAlignVerticalCenter />} // Updated icon
                onClick={() => handleVerticalAlignmentChange('middle')}
                size="small"
                disabled={disabled}
            />
            <Button
                type={verticalAlign === 'bottom' ? 'primary' : 'default'} // Corrected alignment check
                icon={<MdAlignVerticalBottom />} // Updated icon
                onClick={() => handleVerticalAlignmentChange('bottom')} // Corrected alignment value
                size="small"
                disabled={disabled}
            />
        </div>
    );
};

export default TextVerticalAlignmentPicker;
