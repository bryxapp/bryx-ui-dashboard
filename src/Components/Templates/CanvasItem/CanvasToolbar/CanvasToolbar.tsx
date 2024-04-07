import { useState } from "react";
import { EmailInputObj, HeadingObj, ParagraphObj, PhoneInputObj, ShortTextInputObj } from "../../../../utils/types/CanvasInterfaces";
import { Menu } from "antd";
import { createEllipseObj, createEmailInputObj, createHeadingdObj, createParagraphObj, createPhoneInputObj, createRectangleObj, createRoundedRectangleObj, createShortTextInputObj } from "../../../../utils/types/ShapesFactory";
import ShapesMenu from "./ShapesMenu/ShapesMenu";
import TextMenu from "./TextMenu/TextMenu";
import ImagesMenu from "./ImagesMenu/ImagesMenu";
import { FaRegImages, FaShapes } from "react-icons/fa";
import { MdImageSearch, MdTextFields } from 'react-icons/md';
import { MdAddPhotoAlternate } from 'react-icons/md';
import { PlusOutlined } from '@ant-design/icons';
import PublicImages from "./ImagesMenu/PublicImages/PublicImages";
import UserImages from "./ImagesMenu/UserImages/UserImages";
import { MdOutlineRectangle as AddRectangleIcon, MdOutlineCrop75 as AddRoundedRectangleIcon, MdOutlineCircle as AddEllipseIcon } from 'react-icons/md';
import { useCanvasDesignContext } from "../../../../utils/contexts/canvasDesignContext";

interface CanvasToolbarProps {
    isLoading: boolean;
}

const CanvasToolbar = ({ isLoading }: CanvasToolbarProps) => {
    const { canvasDesign, setCanvasDesign } = useCanvasDesignContext();
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    const selectedKeys: string[] = [];

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

    const [openStockImages, setOpenStockImages] = useState(false);
    const [openUserImages, setOpenUserImages] = useState(false);

    const handleStockImagesClick = () => {
        setOpenStockImages(true);
    }

    const handleUserImagesClick = () => {
        setOpenUserImages(true);
    }

    const handleAddHeading = () => {
        const newHeading: HeadingObj = createHeadingdObj('Heading', 20, 'black', 'Arial', 'normal', '');
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newHeading],
        });
    };

    const handleAddParagraph = () => {
        const newParagraph: ParagraphObj = createParagraphObj('Paragraph', 12, 'black', 'Arial', 'normal', '');
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newParagraph],
        });
    };

    const handleAddEmailInput = () => {
        const newEmailInput: EmailInputObj = createEmailInputObj(
            'Email',
            true,
            'john.doe@email.com',
            20,
            'black',
            'Arial',
            'normal',
            '',
            false
        );
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newEmailInput],
        });
    };

    const handleAddPhoneInput = () => {
        const newPhoneInput: PhoneInputObj = createPhoneInputObj(
            'Phone Number #',
            true,
            '(555)555-5555',
            20,
            'black',
            'Arial',
            'normal',
            '',
            false
        );
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newPhoneInput],
        });
    };

    const handleAddShortTextInput = () => {
        const newShortTextInput: ShortTextInputObj = createShortTextInputObj(
            'Input',
            true,
            'Short Text',
            20,
            'black',
            'Arial',
            'normal',
            '',
            false
        );
        setCanvasDesign({
            ...canvasDesign,
            Shapes: [...canvasDesign.Shapes, newShortTextInput],
        });
    };

    // render canvas components when data is available
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
            <Menu.SubMenu
                key="shapes"
                icon={<FaShapes />}
                title="Shapes"
            >
                <Menu.Item
                    key="rectangle"
                    onClick={handleAddRectangle}
                    icon={<AddRectangleIcon />}
                >
                    Rectangle
                </Menu.Item>
                <Menu.Item
                    key="roundedRectangle"
                    onClick={handleAddRoundedRectangle}
                    icon={<AddRoundedRectangleIcon />}
                >
                    Rounded Rectangle
                </Menu.Item>
                <Menu.Item
                    key="ellipse"
                    onClick={handleAddEllipse}
                    icon={<AddEllipseIcon />}
                >
                    Ellipse
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
                key="text"
                icon={<MdTextFields />}
                title="Text"
            >
                <Menu.Item
                    key="heading"
                    onClick={handleAddHeading}
                    icon={<PlusOutlined />}
                >
                    Heading
                </Menu.Item>
                <Menu.Item
                    key="paragraph"
                    onClick={handleAddParagraph}
                    icon={<PlusOutlined />}
                >
                    Paragraph
                </Menu.Item>
                <Menu.Item
                    key="emailInput"
                    onClick={handleAddEmailInput}
                    icon={<PlusOutlined />}
                >
                    Email Input
                </Menu.Item>
                <Menu.Item
                    key="phoneInput"
                    onClick={handleAddPhoneInput}
                    icon={<PlusOutlined />}
                >
                    Phone Input
                </Menu.Item>
                <Menu.Item
                    key="shortTextInput"
                    onClick={handleAddShortTextInput}
                    icon={<PlusOutlined />}
                >
                    Short Text Input
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
                key="images"
                icon={<MdAddPhotoAlternate />}
                title="Images"
            >
                <>
                    <Menu.Item
                        key="stock-images"
                        onClick={handleStockImagesClick}
                        icon={<MdImageSearch />}
                    >
                        Stock Images
                    </Menu.Item>
                    <Menu.Item
                        key="user-images"
                        onClick={handleUserImagesClick}
                        icon={<FaRegImages />}
                    >
                        User Images
                    </Menu.Item>
                    <PublicImages open={openStockImages} setOpen={setOpenStockImages} />
                    <UserImages open={openUserImages} setOpen={setOpenUserImages} />
                </>
            </Menu.SubMenu>
        </Menu>
    );
};

export default CanvasToolbar;
