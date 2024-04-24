import React from 'react';
import { Button, Tooltip } from 'antd';
import { MdDelete } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa6";
import { EstimateData } from '../../../utils/types/EstimateInterfaces';
import { EstimateDraftData } from '../../../utils/types/EstimateInterfaces';
import Link from '../../SharedComponents/Link/Link';
import { MdModeEdit } from "react-icons/md";

interface EstimatesActionPanelProps {
    estimate: EstimateData | EstimateDraftData;
    setOpen: (open: boolean) => void;
    editLink: string;
    type: string;
}

const EstimatesActionPanel: React.FC<EstimatesActionPanelProps> = ({ setOpen, editLink, type }) => {

    const handleDeleteClick = () => {
        setOpen(true);
    };
    const toolTipText = type === 'draft' ? 'Edit Draft' : 'View Estimate';
    const deleteText = type === 'draft' ? 'Delete Draft' : 'Delete Estimate';
    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: "6rem", justifyContent: "space-around" }}>
            <Tooltip title={toolTipText} placement='bottom'>
                <Link to={editLink}>
                    <Button type='link' icon={type === 'draft' ? <MdModeEdit size={30} /> : <FaBookOpen size={30} />} />
                </Link>
            </Tooltip>
            <Tooltip title={deleteText} placement='bottom'>
                <Button type="link" icon={<MdDelete size={30} />} onClick={handleDeleteClick} />
            </Tooltip>
        </div>
    );
};

export default EstimatesActionPanel;
