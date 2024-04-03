import { Tooltip, Menu } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { ParagraphObj } from '../../../../../utils/types/CanvasInterfaces';
import { createParagraphObj } from '../../../../../utils/types/ShapesFactory';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';

const AddParagraph = ({ setAnchorEl }: any) => {
  const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();

  const handleAddParagraph = () => {
    setAnchorEl(null);
    const newParagraph: ParagraphObj = createParagraphObj('Paragraph', 12, 'black', 'Arial', 'normal', '');
    setCanvasDesign({
      ...canvasDesign,
      Shapes: [...canvasDesign.Shapes, newParagraph],
    });
  };

  return (
    <Tooltip title="Add Paragraph" placement="right">
      <Menu onClick={handleAddParagraph}>
        <Menu.Item>
          <PlusOutlined /> Paragraph
        </Menu.Item>
      </Menu>
    </Tooltip>
  );
};

export default AddParagraph;