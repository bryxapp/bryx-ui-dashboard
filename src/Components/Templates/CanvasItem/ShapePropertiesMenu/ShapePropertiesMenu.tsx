import { deleteShape, findShape, isImageObject, isInputObject, isSolidShapeObj, isTextObject } from '../../../../utils/shapeManagementUtils';
import { Divider, Menu, Typography } from 'antd';
import { MdLayers as LayerIcon } from 'react-icons/md';
import { DeleteOutlined } from '@ant-design/icons';
import { InputObj, SolidShapeObj, TextObj } from '../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../utils/contexts/canvasDesignContext';
import LayerManager from './LayerManager/LayerManager';
import { MdFormatColorText } from 'react-icons/md';
import { IoMdColorPalette } from "react-icons/io";
import TextProperties from './TextProperties/TextProperties';
import SolidShapesProperties from './SolidShapesProperties/SolidShapesProperties';
import InputProperties from './InputProperties/InputProperties';

const PropertiesMenu = () => {
    const { canvasDesign, setCanvasDesign, selectedId, setSelectedId } = useCanvasDesignContext();

    const shapeObj = findShape(canvasDesign, selectedId);
    if (!shapeObj) return null;
    const istextObj = isTextObject(shapeObj);
    const issolidShapeObj = isSolidShapeObj(shapeObj);
    const isinputObj = isInputObject(shapeObj);
    const isImageObj = isImageObject(shapeObj);

    const handleDeleteShape = () => {
        deleteShape(canvasDesign, setCanvasDesign, selectedId, setSelectedId);
    }

    return (
        <Menu
            mode="inline"
            style={{ height: '100%' }}
        // selectedKeys={selectedKeys}
        // openKeys={openKeys}
        // onOpenChange={(keys) => {
        //     setOpenKeys(keys as string[]);
        // }}
        >
            <Typography.Text style={{ display: "flex", justifyContent: "center" }}><strong>Properties</strong></Typography.Text>
            <Divider style={{ margin: 0 }} />
            {istextObj &&
                (
                    <Menu.SubMenu
                        key="textProperties"
                        title="Text"
                        icon={<MdFormatColorText />}
                    >
                        <TextProperties textObj={shapeObj as TextObj} itemType={null} />
                    </Menu.SubMenu>
                )
            }
            {issolidShapeObj &&
                (
                    <Menu.SubMenu
                        key="shapeColor"
                        title="Color"
                        icon={<IoMdColorPalette />}
                    >
                        <SolidShapesProperties solidShapeObj={shapeObj as SolidShapeObj} />
                    </Menu.SubMenu>
                )
            }
            {isinputObj &&
                <InputProperties inputObj={shapeObj as InputObj} />
            }
            {isinputObj && isImageObj && (<div></div>)}
            <Menu.SubMenu key="layerManager" title="Layer" icon={<LayerIcon />}>
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
    );
};

export default PropertiesMenu;

