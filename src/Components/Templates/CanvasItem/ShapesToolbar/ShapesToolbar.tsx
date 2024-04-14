import { useState } from "react";
import { Divider, Menu, Typography } from "antd";
import ShapesMenu from "./ShapesMenu/ShapesMenu";
import TextMenu from "./TextMenu/TextMenu";
import ImagesMenu from "./ImagesMenu/ImagesMenu";
import { FaShapes } from "react-icons/fa";
import { MdTextFields } from 'react-icons/md';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { LuTextCursorInput } from "react-icons/lu";
import { TableOutlined } from "@ant-design/icons";
import InputMenu from "./InputMenu/InputMenu";
import TableMenu from "./TableMenu/TableMenu";
import { MdNoteAdd } from "react-icons/md";

interface CanvasToolbarProps {
    isLoading: boolean;
}

const ShapesToolbar = ({ isLoading }: CanvasToolbarProps) => {
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const selectedKeys: string[] = [];

    return (
        <Menu
            mode="inline"
            style={{ height: '100%' }}
            disabled={isLoading}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={(keys) => {
                setOpenKeys(keys as string[]);
            }}
        >
            <div style={{ display: "flex", alignItems: "center", justifyContent:"center" }}>
                <div style={{ marginRight: 20, fontSize:24 }}>
                    <MdNoteAdd/>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", width: "8rem" }}>
                    <Typography.Text>
                        <strong>Add To</strong>
                    </Typography.Text>
                    <Typography.Text>
                        <strong>Your Template</strong>
                    </Typography.Text>
                </div>
            </div>
            <Divider style={{ margin: 0 }} />
            <Menu.SubMenu
                key="shapes"
                icon={<FaShapes />}
                title="Shapes"
            >
                <ShapesMenu />
            </Menu.SubMenu>
            <Menu.SubMenu
                key="text"
                icon={<MdTextFields />}
                title="Text"
            >
                <TextMenu />
            </Menu.SubMenu>
            <Menu.SubMenu
                key="input"
                icon={<LuTextCursorInput />}
                title="Input"
            >
                <InputMenu />
            </Menu.SubMenu>
            <Menu.SubMenu
                key="table"
                icon={<TableOutlined />}
                title="Table"
            >
                <TableMenu />
            </Menu.SubMenu>
            <Menu.SubMenu
                key="images"
                icon={<MdAddPhotoAlternate />}
                title="Images"
            >
                <ImagesMenu />
            </Menu.SubMenu>

        </Menu>
    );
};

export default ShapesToolbar;
