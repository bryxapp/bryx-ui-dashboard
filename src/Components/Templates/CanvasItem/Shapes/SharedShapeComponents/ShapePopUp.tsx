import { Html } from 'react-konva-utils';
import { deleteShape } from '../../../../../utils/shapeManagementUtils';
import { ShapeObj } from '../../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { Menu } from 'antd';
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';

interface ShapePopUpProps {
    shapeObj: ShapeObj;
    width: number;
}

const ShapePopUp = ({
    shapeObj,
    width,
}: ShapePopUpProps) => {
    const { canvasDesign, setCanvasDesign, selectedId, setSelectedId } = useCanvasDesignContext();
    
    const handleDeleteShape = () => {
        deleteShape(canvasDesign, setCanvasDesign, selectedId, setSelectedId);
    }

    const handleOpenProperties = () => {
        console.log('Open properties');
    }

    return (
        <Html>
                <Menu
                    style={{
                        position: 'absolute',
                        left: `${shapeObj.x + width + 10}px`, // Adjusted to apply positioning
                        top: `${shapeObj.y - 15}px`,
                        gap: '10px', // Adds space between child components
                        borderRadius: '5px', // Rounded corners for a softer look
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
                        alignItems: 'center', // Ensures children are aligned in the center vertically
                        zIndex: 1000
                    }}
                    selectedKeys={[]}
                    mode="vertical"
                >
                    <Menu.Item key="delete"
                        title="Properties"
                        icon={<SettingOutlined />}
                        onClick={handleOpenProperties}
                    >
                        Properties
                    </Menu.Item>
                    <Menu.Item key="delete"
                        title="Delete"
                        icon={<DeleteOutlined />}
                        onClick={handleDeleteShape}
                    >
                        Delete
                    </Menu.Item>
                </Menu>
        </Html>
    );
};

export default ShapePopUp;

