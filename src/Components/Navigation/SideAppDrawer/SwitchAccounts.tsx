import { useState } from 'react';
import { Button, Popover } from 'antd';
import { FaAngleDown } from "react-icons/fa";
import { useOrganizationContext } from '../../../utils/contexts/OrganizationContext';

const SwitchAccounts = () => {
    const [open, setOpen] = useState(false);
    const { organization } = useOrganizationContext();
    const displayName = organization? organization?.auth0Org?.name : 'Personal Account';

    const handleOpenChange = (open: boolean | ((prevState: boolean) => boolean)) => {
        setOpen(open);
    };

    const content = (
        <div>
            {/* Here you can put the content or links for switching accounts */}
            <p>Account 1</p>
            <p>Account 2</p>
            <p>Account 3</p>
        </div>
    );

    return (
        <Popover
            content={content}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
            placement="bottom"
        >
            <Button type="link">
                {displayName} <FaAngleDown />
            </Button>
        </Popover>
    );
}

export default SwitchAccounts;
