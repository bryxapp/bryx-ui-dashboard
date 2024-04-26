import React from 'react';
import { Card, Input, Typography } from 'antd';
import { TableCellObj } from '../../../../../utils/types/CanvasInterfaces';
import TextProperties from '../TextProperties/TextProperties';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { updateInputProperty } from '../../../../../utils/shapeManagementUtils';
import TextAlignmentPicker from '../TextProperties/TextAlignmentPicker';
import TextVerticalAlignmentPicker from '../TextProperties/TextVerticalAlignmentPicker';
import CellTypeSelector from './CellTypeSelector';

interface CellPropertiesProps {
    tableCellObj: TableCellObj;
}

const CellProperties: React.FC<CellPropertiesProps> = ({ tableCellObj }) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();
    if (!tableCellObj.content) return (
        <Card>
            <CellTypeSelector tableCellObj={tableCellObj} />
        </Card>
    )

    const selectedIsInput = tableCellObj.content.type === 'CellInput'
    const handleContentValueChange = (event: React.ChangeEvent<any>) => {
        updateInputProperty(canvasDesign, setCanvasDesign, 'content', 'value', event.target.value, selectedId);
    };

    return (
        <Card>
            <CellTypeSelector tableCellObj={tableCellObj} />
            {selectedIsInput && (
                <>
                    <Typography.Text>Place Holder</Typography.Text>
                    <Input.TextArea
                        id="contentValueEditor"
                        value={tableCellObj.content?.value}
                        onChange={handleContentValueChange}
                        size="small"
                        placeholder="Optional"
                    />
                </>
            )}
            <TextProperties textObj={tableCellObj.content} itemType="content" verticalAlign={tableCellObj.verticalAlign} />
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <TextAlignmentPicker horizontalAlign={tableCellObj.horizontalAlign} itemType={null} />
                <>
                    <div style={{ width: '1rem' }} />
                    <TextVerticalAlignmentPicker verticalAlign={tableCellObj.verticalAlign} />
                </>
            </div>
        </Card>
    );
};

export default CellProperties;
