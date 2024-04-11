import { useState } from "react";
import { Divider, Menu, Typography } from "antd";
import ShapesMenu from "./ShapesMenu/ShapesMenu";
import TextMenu from "./TextMenu/TextMenu";
import ImagesMenu from "./ImagesMenu/ImagesMenu";
import { FaShapes } from "react-icons/fa";
import { MdTextFields } from 'react-icons/md';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { LuTextCursorInput } from "react-icons/lu";
import InputMenu from "./InputMenu/InputMenu";

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
            <Typography.Text style={{ display:"flex", justifyContent:"center"}}><strong>Add To Your Template</strong></Typography.Text>
            <Divider style={{ margin:0 }} />
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
