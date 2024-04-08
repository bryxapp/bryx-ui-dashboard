import { Menu } from 'antd';
import { DeleteOutlined, SettingOutlined } from '@ant-design/icons';
import { deleteShape, findShape, getShapeWidth } from '../../../utils/shapeManagementUtils';
import { useCanvasDesignContext } from '../../../utils/contexts/canvasDesignContext';
import { RefObject, useEffect, useState } from 'react';

const MENU_WIDTH = 140;

interface ShapePopUpProps {
    stageRef: RefObject<HTMLDivElement>;
}

const ShapePopUp = ({ stageRef }: ShapePopUpProps) => {
    const [position, setPosition] = useState({ left: 0, top: 0 });
    const [showPopUp, setShowPopUp] = useState(false);
    const { canvasDesign, setCanvasDesign, selectedId, setSelectedId } = useCanvasDesignContext();

    const handleDeleteShape = () => {
        deleteShape(canvasDesign, setCanvasDesign, selectedId, setSelectedId);
    };

    const handleOpenProperties = () => {
        console.log('Open properties');
    };

    useEffect(() => {
        if (!selectedId || stageRef?.current === null) {
            setShowPopUp(false);
            return;
        }

        const shape = stageRef.current.getBoundingClientRect();
        const stageTop = shape.top + window.scrollY;
        const stageLeft = shape.left + window.scrollX;

        const selectedShape = findShape(canvasDesign, selectedId);
        if (!selectedShape) return;
        const shapeWidth = getShapeWidth(selectedShape);

        if (selectedShape) {
            const calculatedLeft = Math.min(stageLeft + selectedShape.x + shapeWidth + 10, window.innerWidth - MENU_WIDTH - 10);
            const calculatedTop = Math.max(stageTop + selectedShape.y - 15, 0);

            setPosition({ left: calculatedLeft, top: calculatedTop });
            setShowPopUp(true);
        }
    }, [selectedId, canvasDesign, stageRef]);

    if (!showPopUp) return null;

    return (
        <Menu
            style={{
                position: 'absolute',
                left: `${position.left}px`,
                top: `${position.top}px`,
                gap: '10px',
                borderRadius: '5px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                alignItems: 'center',
                zIndex: 1000,
                width: MENU_WIDTH
            }}
            selectedKeys={[]}
            mode="vertical"
        >
            <Menu.Item key="properties"
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
    );
};

export default ShapePopUp;