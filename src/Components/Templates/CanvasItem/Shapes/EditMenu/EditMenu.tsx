import { Html } from 'react-konva-utils';
import { deleteShape, isImageObject, isInputObject, isSolidShapeObj, isTextObject } from '../../../../../utils/shapeManagementUtils';
import { ShapeObj, SolidShapeObj, TextObj } from '../../../../../utils/types/CanvasInterfaces';
import TextPropertiesMenu from './InputStyler/TextPropertiesMenu/TextPropertiesMenu';
import { PassInCanvasDesignProvider, useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';
import { Menu } from 'antd';
import LayerManager from './LayerManager/LayerManager';
import { MdLayers as LayerIcon } from 'react-icons/md';
import { DeleteOutlined } from '@ant-design/icons';
import FillColorPicker from './ColorPicker/FillColorPicker';
import BorderColorPicker from './ColorPicker/BorderColorPicker';

interface EditMenuProps {
    shapeObj: ShapeObj;
    width: number;
}

const EditMenu = ({
    shapeObj,
    width,
}: EditMenuProps) => {
    const istextObj = isTextObject(shapeObj);
    const issolidShapeObj = isSolidShapeObj(shapeObj);
    const isinputObj = isInputObject(shapeObj);
    const isImageObj = isImageObject(shapeObj);

    const { canvasDesign, setCanvasDesign, selectedId, setSelectedId } = useCanvasDesignContext();
    const handleDeleteShape = () => {
        deleteShape(canvasDesign, setCanvasDesign, selectedId, setSelectedId);
    }
    return (
        <Html>
            <PassInCanvasDesignProvider canvasDesign={canvasDesign} setCanvasDesign={setCanvasDesign} selectedId={selectedId} setSelectedId={setSelectedId}>
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
                    <div style={{height: 10}}></div>
                    {istextObj &&
                        (
                            <Menu.Item key="textProperties">
                                <TextPropertiesMenu textObj={shapeObj as TextObj} itemType={null} />
                            </Menu.Item>
                        )
                    }
                    {issolidShapeObj &&
                        (
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-around" }}>
                                <FillColorPicker solidShapeObj={shapeObj as SolidShapeObj} />
                                <BorderColorPicker solidShapeObj={shapeObj as SolidShapeObj} />
                            </div>
                        )
                    }
                    {isinputObj && isImageObj && (<div></div>)}
                    <Menu.SubMenu key="layerManager" title="Layer Manager" icon={<LayerIcon />}>
                        <LayerManager />
                    </Menu.SubMenu>
                    <Menu.Item key="delete"
                        title="Delete"
                        icon={<DeleteOutlined />}
                        onClick={handleDeleteShape}
                    >
                        Delete
                    </Menu.Item>
                </Menu>
            </PassInCanvasDesignProvider>
        </Html>
    );
};

export default EditMenu;

