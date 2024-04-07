import { useState } from 'react';
import { Menu } from 'antd'
import { MdImageSearch } from "react-icons/md";
import PublicImages from './PublicImages/PublicImages';
import UserImages from './UserImages/UserImages';
import { FaRegImages } from "react-icons/fa";

export default function ImagesMenu() {
    const [openStockImages, setOpenStockImages] = useState(false);
    const [openUserImages, setOpenUserImages] = useState(false);

    const handleStockImagesClick = () => {
        setOpenStockImages(true);
    }

    const handleUserImagesClick = () => {
        setOpenUserImages(true);
    }

    return (
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
    );
}
