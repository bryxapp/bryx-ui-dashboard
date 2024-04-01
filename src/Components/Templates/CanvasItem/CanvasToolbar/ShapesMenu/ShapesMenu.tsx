import { useState } from 'react';
import { Dropdown, Tooltip, Button, MenuProps } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { EllipseObj, RectangleObj } from '../../../../../utils/types/CanvasInterfaces';
import { createEllipseObj, createRectangleObj, createRoundedRectangleObj } from '../../../../../utils/types/ShapesFactory';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import AddRectangleIcon from "@mui/icons-material/RectangleOutlined";
import AddRoundedRectangleIcon from "@mui/icons-material/Crop75Outlined";
import AddEllipseIcon from "@mui/icons-material/CircleOutlined";

interface ShapesMenuProps {
    isLoading: boolean;
}

export default function ShapesMenu({ isLoading }: ShapesMenuProps) {
    // Ant Design's Dropdown does not require manual handling of anchor elements
    const [open, setOpen] = useState(false);
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();

    const handleAddRectangle = () => {
        setOpen(false);

        const newRectangle: RectangleObj = createRectangleObj(200, 300, '#CDB38B', '', 1);

        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newRectangle]
        });
    }

    const handleAddRoundedRectangle = () => {
        setOpen(false);
        const newRectangle: RectangleObj = createRoundedRectangleObj(300, 200, '#00fff0', '', 1, 20);
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newRectangle]
        });
    }

    const handleAddEllipse = () => {
        setOpen(false);

        const newEllipse: EllipseObj = createEllipseObj(100, 100, '#355E3B', '', 1);

        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newEllipse]
        });
    }

    const items: MenuProps['items'] = [
        {
            key: 'rectangle',
            onClick: handleAddRectangle,
            icon: <AddRectangleIcon />,
            label: 'Rectangle'
        },
        {
            key: 'roundedRectangle',
            onClick: handleAddRoundedRectangle,
            icon: <AddRoundedRectangleIcon />,
            label: 'Rounded Rectangle'
        },
        {
            key: 'ellipse',
            onClick: handleAddEllipse,
            icon: <AddEllipseIcon />,
            label: 'Ellipse'
        },
    ];

    return (
        <Tooltip title="Add new shape" placement="bottom">
            <Dropdown

                menu={{ items }}
                trigger={['click']}
                onOpenChange={(flag) => setOpen(flag)}
                open={open}
                disabled={isLoading}
            >
                <Button size="large" icon={<AppstoreOutlined />} />
            </Dropdown>
        </Tooltip>
    );
}
