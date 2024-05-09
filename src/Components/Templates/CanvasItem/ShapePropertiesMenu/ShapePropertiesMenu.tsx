import { deleteShape, findShape, isCellObject, isInputObject, isSolidShapeObj, isTableObject, isTextObject } from '../../../../utils/shapeManagementUtils';
import { Divider, Menu, Typography } from 'antd';
import { MdLayers as LayerIcon } from 'react-icons/md';
import { DeleteOutlined } from '@ant-design/icons';
import { InputObj, SolidShapeObj, TableCellObj, TableInputObj, TextObj } from '../../../../utils/types/CanvasInterfaces';
import { useCanvasDesignContext } from '../../../../utils/contexts/canvasDesignContext';
import LayerManager from './LayerManager/LayerManager';
import { MdFormatColorText } from 'react-icons/md';
import { IoMdColorPalette } from "react-icons/io";
import SolidShapesProperties from './SolidShapesProperties/SolidShapesProperties';
import InputContentProperties from './InputProperties/ContentProperties';
import TextPropertiesCard from './TextProperties/TextPropertiesCard';
import { BsTextareaResize } from "react-icons/bs";
import { mapTypeToIcon, mapTypeToTitle } from '../../../../utils/iconUtils';
import TableProperties from './TableProperties/TableProperties';
import { TableOutlined } from "@ant-design/icons";
import CellProperties from './CellProperties/CellProperties';
import { MdOutlineRectangle } from "react-icons/md";


const PropertiesMenu = () => {
    const { canvasDesign, setCanvasDesign, selectedId, setSelectedId } = useCanvasDesignContext();

    const shapeObj = findShape(canvasDesign, selectedId);
    if (!shapeObj) return null;
    const istextObj = isTextObject(shapeObj);
    const issolidShapeObj = isSolidShapeObj(shapeObj);
    const isinputObj = isInputObject(shapeObj);
    const isTableObj = isTableObject(shapeObj);
    const isCellObj = isCellObject(shapeObj);

    const handleDeleteShape = () => {
        deleteShape(canvasDesign, setCanvasDesign, selectedId, setSelectedId);
    }

    return (
        <Menu
            mode="inline"
            style={{ height: '100%' }}
        >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ marginRight: 20, fontSize: 24 }}>
                    {mapTypeToIcon(shapeObj.type)}
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "8rem" }}>
                    <Typography.Text>
                        <strong>{mapTypeToTitle(shapeObj.type)}</strong>
                    </Typography.Text>
                    <Typography.Text>
                        <strong>Properties</strong>
                    </Typography.Text>
                </div>
            </div>
            <Divider style={{ margin: 0 }} />
            {istextObj &&
                (
                    <Menu.SubMenu
                        key="textProperties"
                        title="Text"
                        icon={<MdFormatColorText />}
                    >
                        <TextPropertiesCard textObj={shapeObj as TextObj} />
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
                            key="contentProperties"
                            title="Content"
                            icon={<BsTextareaResize />}
                        >
                            <InputContentProperties inputObj={shapeObj as InputObj} />
                        </Menu.SubMenu>
                    </>
                )}
            {isTableObj && (
                <Menu.SubMenu
                    key="tableProperties"
                    title="Table"
                    icon={<TableOutlined />}
                >
                    <TableProperties tableObj={shapeObj as TableInputObj} />
                </Menu.SubMenu>
            )}
            {isCellObj && (
                <Menu.SubMenu

                    key="cellProperties"
                    title="Cell"
                    icon={<MdOutlineRectangle />}
                >
                    <CellProperties tableCellObj={shapeObj as TableCellObj} />
                </Menu.SubMenu>
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




