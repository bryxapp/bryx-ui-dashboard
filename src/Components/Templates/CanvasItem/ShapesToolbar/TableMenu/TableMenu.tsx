import { Menu } from 'antd';
import { TableInputObj } from '../../../../../utils/types/CanvasInterfaces';
import { createTableInputObj } from '../../../../../utils/types/ShapesFactory';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { mapTypeToIcon, mapTypeToTitle } from '../../../../../utils/iconUtils';

const TableMenu = () => {
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();
    const handleAddTableInput = () => {
        const newTableInput: TableInputObj = createTableInputObj(
            'Table',
            true,
            'Table',
            20,
            'black',
            'Arial',
            'normal',
            '',
            false
        );
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newTableInput],
        });
    }

    return (
        <>
            <Menu.Item
                key="tableInput"
                onClick={handleAddTableInput}
                icon={mapTypeToIcon('TableInput')}
            >
                {mapTypeToTitle('TableInput')}
            </Menu.Item>
        </>
    );
};

export default TableMenu;