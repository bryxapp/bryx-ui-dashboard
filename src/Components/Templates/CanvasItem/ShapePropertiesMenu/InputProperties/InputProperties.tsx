import { Checkbox, Input, Menu, Typography } from 'antd';
import { MdFormatColorText } from 'react-icons/md';
import { InputObj, TextObj } from '../../../../../utils/types/CanvasInterfaces';
import TextProperties from '../TextProperties/TextProperties';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { updateInputProperty, updateShapeProperty } from '../../../../../utils/shapeManagementUtils';

interface InputPropertiesProps {
    inputObj: InputObj;
}

const InputProperties = ({ inputObj }: InputPropertiesProps) => {
    const { canvasDesign, setCanvasDesign, selectedId } = useCanvasDesignContext();

    const handleLabelValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateInputProperty(canvasDesign, setCanvasDesign, 'label', 'value', event.target.value, selectedId);
    };

    const handleHasLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateShapeProperty(canvasDesign, setCanvasDesign, 'hasLabel', event.target.checked, selectedId);
    };

    const handleContentValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateInputProperty(canvasDesign, setCanvasDesign, 'content', 'value', event.target.value, selectedId);
    };

    const selectedInputContent = inputObj.content.value ?? '';
    const selectedInputLabel = inputObj.label.value ?? '';
    const hasLabel = inputObj?.hasLabel ?? false;

    return (
        <>
            <Menu.SubMenu
                key="labelProperties"
                title="Label"
                icon={<MdFormatColorText />}
            >
                <Checkbox
                    checked={hasLabel}
                    onChange={(e: any) => { handleHasLabelChange(e) }}
                >
                    Has Label
                </Checkbox>
                <Input
                    id={'labelValueEditor'}
                    value={selectedInputLabel}
                    onChange={handleLabelValueChange}
                    variant="outlined"
                    size='small'
                    disabled={!hasLabel}
                />
                <TextProperties textObj={inputObj.label as TextObj} itemType={'label'} disabled={!hasLabel} />
            </Menu.SubMenu>
            <Menu.SubMenu
                key="contentProperties"
                title="Content"
                icon={<MdFormatColorText />}
            >
                <Typography.Text>Place Holder</Typography.Text>
                <Input
                    id={'contentValueEditor'}
                    value={selectedInputContent}
                    onChange={handleContentValueChange}
                    size='small'
                />
                <TextProperties textObj={inputObj.content as TextObj} itemType={'content'} />
            </Menu.SubMenu>
        </>
    );
};

export default InputProperties;

