import { Tooltip, Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { HeadingObj } from '../../../../../utils/types/CanvasInterfaces';
import { createHeadingdObj } from '../../../../../utils/types/ShapesFactory';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';

const AddHeading = ({ setAnchorEl }: any) => {
  const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();

  const handleAddHeading = () => {
    setAnchorEl(null);
    const newHeading: HeadingObj = createHeadingdObj('Heading', 20, 'black', 'Arial', 'normal', '');
    setCanvasDesign({
      ...canvasDesign,
      Shapes: [...canvasDesign.Shapes, newHeading],
    });
  };

  return (
    <Tooltip title="Add Heading" placement="right">
      <Menu onClick={handleAddHeading}>
        <Menu.Item>
          <PlusOutlined /> Heading
        </Menu.Item>
      </Menu>
    </Tooltip>
  );
};

export default AddHeading;