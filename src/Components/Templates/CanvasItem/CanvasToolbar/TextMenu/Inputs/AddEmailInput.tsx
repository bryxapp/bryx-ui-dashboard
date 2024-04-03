import { Tooltip, Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { EmailInputObj } from '../../../../../../utils/types/CanvasInterfaces';
import { createEmailInputObj } from '../../../../../../utils/types/ShapesFactory';
import { useCanvasDesignContext } from '../../../../../../utils/contexts/canvasDesignContext';

interface AddEmailInputProps {
  setAnchorEl: React.Dispatch<React.SetStateAction<any>>;
}

const AddEmailInput = ({ setAnchorEl }: AddEmailInputProps) => {
  const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();

  const handleAddEmailInput = () => {
    setAnchorEl(null);
    const newEmailInput: EmailInputObj = createEmailInputObj(
      'Email',
      true,
      'john.doe@email.com',
      20,
      'black',
      'Arial',
      'normal',
      '',
      false
    );
    setCanvasDesign({
      ...canvasDesign,
      Shapes: [...canvasDesign.Shapes, newEmailInput],
    });
  };

  return (
    <Tooltip title="Add Email Input" placement="right">
      <Menu onClick={handleAddEmailInput}>
        <Menu.Item>
          <PlusOutlined /> Email Input
        </Menu.Item>
      </Menu>
    </Tooltip>
  );
};

export default AddEmailInput;