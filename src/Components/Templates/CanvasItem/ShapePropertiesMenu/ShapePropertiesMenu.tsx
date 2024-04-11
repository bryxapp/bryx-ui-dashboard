import { deleteShape, findShape, isImageObject, isInputObject, isSolidShapeObj, isTextObject } from '../../../../utils/shapeManagementUtils';
import { Card, Divider, Menu, Typography } from 'antd';
import { MdLayers as LayerIcon } from 'react-icons/md';
import { DeleteOutlined } from '@ant-design/icons';
import BorderColorPicker from './ColorPicker/BorderColorPicker';
import { SolidShapeObj, TextObj } from '../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../utils/contexts/canvasDesignContext';
import FillColorPicker from './ColorPicker/FillColorPicker';
import LayerManager from './LayerManager/LayerManager';
import FontSizePicker from './InputStyler/TextPropertiesMenu/FontSizePicker';
import FontFamilyPicker from './InputStyler/TextPropertiesMenu/FontFamilyPicker';
import TextColorPicker from './InputStyler/TextPropertiesMenu/TextColorPicker';
import FontStylePicker from './InputStyler/TextPropertiesMenu/FontStylePicker';
import FontDecorationPicker from './InputStyler/TextPropertiesMenu/FontDecorationPicker';
import TextAlignmentPicker from './InputStyler/TextPropertiesMenu/TextAlignmentPicker';
import { MdFormatColorText } from 'react-icons/md';
import { IoMdColorPalette } from "react-icons/io";

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
            <Typography.Text style={{ display:"flex", justifyContent:"center"}}><strong>Properties</strong></Typography.Text>
            <Divider style={{ margin:0 }} />
            {istextObj &&
                (
                    <Menu.SubMenu
                        key="textProperties"
                        title="Text"
                        icon={<MdFormatColorText />}
                    >
                        <Card >
                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '.5rem', justifyContent: 'center', alignItems: 'center' }}>
                                <FontFamilyPicker textObj={shapeObj as TextObj} itemType={'content'} />
                                <FontSizePicker textObj={shapeObj as TextObj} itemType={'content'} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '1rem', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <TextColorPicker textObj={shapeObj as TextObj} itemType={'content'} />
                                <TextAlignmentPicker textObj={shapeObj as TextObj} itemType={'content'} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <FontStylePicker textObj={shapeObj as TextObj} itemType={'content'} />
                                <FontDecorationPicker textObj={shapeObj as TextObj} itemType={'content'} />
                            </div>
                        </Card>
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
                        <Card >
                            <FillColorPicker solidShapeObj={shapeObj as SolidShapeObj} />
                            <BorderColorPicker solidShapeObj={shapeObj as SolidShapeObj} />
                        </Card>
                    </Menu.SubMenu>
                )
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

