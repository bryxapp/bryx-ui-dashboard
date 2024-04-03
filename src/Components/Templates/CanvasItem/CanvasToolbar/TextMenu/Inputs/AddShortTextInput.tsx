import { Tooltip, Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ShortTextInputObj } from '../../../../../../utils/types/CanvasInterfaces';
import { createShortTextInputObj } from '../../../../../../utils/types/ShapesFactory';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';

interface AddShortTextInputProps {
  setAnchorEl: React.Dispatch<React.SetStateAction<any>>;
}

const AddShortTextInput = ({ setAnchorEl }: AddShortTextInputProps) => {
  const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();

  const handleAddShortTextInput = () => {
    setAnchorEl(null);
    const newShortTextInput: ShortTextInputObj = createShortTextInputObj(
      'Input',
      true,
      'Short Text',
      20,
      'black',
      'Arial',
      'normal',
      '',
      false
    );
    setCanvasDesign({
      ...canvasDesign,
      Shapes: [...canvasDesign.Shapes, newShortTextInput],
    });
  };

  return (
    <Tooltip title="Add Email Input" placement="right">
      <Menu onClick={handleAddShortTextInput}>
        <Menu.Item>
          <PlusOutlined /> Short Text Input
        </Menu.Item>
      </Menu>
    </Tooltip>
  );
};

export default AddShortTextInput;