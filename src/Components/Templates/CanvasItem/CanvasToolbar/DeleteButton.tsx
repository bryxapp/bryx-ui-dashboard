import { Tooltip, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { deleteShape } from '../../../../utils/shapeManagementUtils';
import { useCanvasDesignContext } from '../../../../utils/contexts/canvasDesignContext';

export default function DeleteButton() {
    const { canvasDesign, setCanvasDesign, selectedId, setSelectedId } = useCanvasDesignContext();
    const handleDeleteShape = () => {
        deleteShape(canvasDesign, setCanvasDesign, selectedId, setSelectedId);
    }

    return (
        <Tooltip title="Delete Shape" placement="bottom">
            <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={handleDeleteShape}
            />
        </Tooltip>
    );
}