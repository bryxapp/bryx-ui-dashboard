import React from 'react';
import { Button } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { EstimateData } from '../../../utils/types/EstimateInterfaces';
import { EstimateDraftData } from '../../../utils/types/EstimateInterfaces';
import Link from '../../SharedComponents/Link/Link';

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

    return (
        <div>
            <Link to={editLink}>
                <Button type="link" icon={type === 'draft' ? <EditOutlined /> : <EyeOutlined />} />
            </Link>
            <Button type="link" icon={<DeleteOutlined />} onClick={handleDeleteClick} />
        </div>
    );
};

export default EstimatesActionPanel;
