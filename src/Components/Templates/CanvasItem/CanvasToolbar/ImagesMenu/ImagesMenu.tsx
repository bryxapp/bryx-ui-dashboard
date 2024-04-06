import { useState } from 'react';
import { Button, Dropdown, MenuProps } from 'antd'
import {MdAddPhotoAlternate as AddImageIcon} from 'react-icons/md';
import PublicImages from './PublicImages/PublicImages';
import UserImages from './UserImages/UserImages';

interface ImagesMenuProps {
    isLoading: boolean;
}

export default function ImagesMenu({ isLoading }: ImagesMenuProps) {
    const [open, setOpen] = useState<boolean>(false);

    const handleVisibleChange = (open: boolean) => {
        if (!isLoading) {
            setOpen(open);
        }
    };
    const items: MenuProps['items'] = [
        {
            key: 'public-images',
            label: (<PublicImages setOpen={setOpen} />)
        },
        {
            key: 'user-images',
            label: (<UserImages setOpen={setOpen} />)
        },
    ]

    return (
        <Dropdown
            menu={{ items }}
            onOpenChange={handleVisibleChange}
            open={open} trigger={['click']}
            disabled={isLoading}>
            <Button size="large" icon={<AddImageIcon />} />
        </Dropdown>
    );
}
