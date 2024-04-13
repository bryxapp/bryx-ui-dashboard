import { deleteShape, findShape, isInputObject, isSolidShapeObj, isTextObject } from '../../../../utils/shapeManagementUtils';
import { Divider, Menu, Typography } from 'antd';
import { MdLayers as LayerIcon } from 'react-icons/md';
import { DeleteOutlined } from '@ant-design/icons';
import { InputObj, SolidShapeObj, TextObj } from '../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../utils/contexts/canvasDesignContext';
import LayerManager from './LayerManager/LayerManager';
import { MdFormatColorText } from 'react-icons/md';
import { IoMdColorPalette } from "react-icons/io";
import SolidShapesProperties from './SolidShapesProperties/SolidShapesProperties';
import InputLabelProperties from './InputProperties/InputLabelProperties';
import InputContentProperties from './InputProperties/ContentProperties';
import TextPropertiesCard from './TextProperties/TextPropertiesCard';
import { GoTag } from "react-icons/go";
import { BsTextareaResize } from "react-icons/bs";

const PropertiesMenu = () => {
    const { canvasDesign, setCanvasDesign, selectedId, setSelectedId } = useCanvasDesignContext();

    const shapeObj = findShape(canvasDesign, selectedId);
    if (!shapeObj) return null;
    const istextObj = isTextObject(shapeObj);
    const issolidShapeObj = isSolidShapeObj(shapeObj);
    const isinputObj = isInputObject(shapeObj);

    const handleDeleteShape = () => {
        deleteShape(canvasDesign, setCanvasDesign, selectedId, setSelectedId);
    }

    return (
        <Menu
            mode="inline"
            style={{ height: '100%' }}
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
                        <TextPropertiesCard textObj={shapeObj as TextObj} itemType={null} />
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
                (
                    <>
                        <Menu.SubMenu
                            key="labelProperties"
                            title="Label"
                            icon={<GoTag />}
                        >
                            <InputLabelProperties inputObj={shapeObj as InputObj} />
                        </Menu.SubMenu>
                        <Menu.SubMenu
                            key="contentProperties"
                            title="Content"
                            icon={<BsTextareaResize />}
                        >
                            <InputContentProperties inputObj={shapeObj as InputObj} />
                        </Menu.SubMenu>
                    </>
                )}
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

