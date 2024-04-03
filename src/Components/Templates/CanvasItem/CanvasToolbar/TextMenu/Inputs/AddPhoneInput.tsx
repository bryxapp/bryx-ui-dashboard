import { Tooltip, Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PhoneInputObj } from '../../../../../../utils/types/CanvasInterfaces';
import { createPhoneInputObj } from '../../../../../../utils/types/ShapesFactory';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';

interface AddPhoneInputProps {
  setAnchorEl: React.Dispatch<React.SetStateAction<any>>;
}

const AddPhoneInput = ({ setAnchorEl }: AddPhoneInputProps) => {
  const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();

  const handleAddPhoneInput = () => {
    setAnchorEl(null);
    const newPhoneInput: PhoneInputObj = createPhoneInputObj(
      'Phone Number #',
      true,
      '(555)555-5555',
      20,
      'black',
      'Arial',
      'normal',
      '',
      false
    );
    setCanvasDesign({
      ...canvasDesign,
      Shapes: [...canvasDesign.Shapes, newPhoneInput],
    });
  };

  return (
    <Tooltip title="Add Phone Input" placement="right">
      <Menu onClick={handleAddPhoneInput}>
        <Menu.Item>
          <PlusOutlined /> Phone Input
        </Menu.Item>
      </Menu>
    </Tooltip>
  );
};

export default AddPhoneInput;