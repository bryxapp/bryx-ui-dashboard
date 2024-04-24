import { useState } from 'react';
import { Menu } from 'antd'
import UserImages from './UserImages/UserImages';
import { FaRegImages } from "react-icons/fa";

export default function ImagesMenu() {
    const [openUserImages, setOpenUserImages] = useState(false);

    const handleUserImagesClick = () => {
        setOpenUserImages(true);
    }

    return (
        <>
                <Menu.Item
                    key="user-images"
                    onClick={handleUserImagesClick}
                    icon={<FaRegImages />}
                >
                    User Images
                </Menu.Item>
            <UserImages open={openUserImages} setOpen={setOpenUserImages} />
        </>
    );
}
