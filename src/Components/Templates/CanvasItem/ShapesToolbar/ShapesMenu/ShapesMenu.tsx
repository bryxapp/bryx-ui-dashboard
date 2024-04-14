import { Menu } from 'antd';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { createEllipseObj, createRectangleObj, createRoundedRectangleObj } from '../../../../../utils/types/ShapesFactory';
import { mapTypeToIcon, mapTypeToTitle } from '../../../../../utils/iconUtils';

function ShapesMenu() {
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();

    const handleAddRectangle = () => {
        const newRectangle = createRectangleObj(200, 300, '#CDB38B', '', 1);
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newRectangle]
        });
    };

    const handleAddRoundedRectangle = () => {
        const newRoundedRectangle = createRoundedRectangleObj(300, 200, '#00fff0', '', 1, 20);
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newRoundedRectangle]
        });
    };

    const handleAddEllipse = () => {
        const newEllipse = createEllipseObj(100, 100, '#355E3B', '', 1);
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newEllipse]
        });
    };

    return (
        <>
            <Menu.Item
                key="rectangle"
                onClick={handleAddRectangle}
                icon={mapTypeToIcon('Rectangle')}
            >
                {mapTypeToTitle('Rectangle')}
            </Menu.Item>
            <Menu.Item
                key="roundedRectangle"
                onClick={handleAddRoundedRectangle}
                icon={mapTypeToIcon('RoundedRectangle')}
            >
                {mapTypeToTitle('RoundedRectangle')}
            </Menu.Item>
            <Menu.Item
                key="ellipse"
                onClick={handleAddEllipse}
                icon={mapTypeToIcon('Ellipse')}
            >
                {mapTypeToTitle('Ellipse')}
            </Menu.Item>
        </>
    );
};

export default ShapesMenu;
