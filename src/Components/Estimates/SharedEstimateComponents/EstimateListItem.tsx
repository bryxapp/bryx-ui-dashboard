import React, { useState } from 'react';
import { List, Typography, Avatar } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { convertEpochTime } from '../../../utils/time-util';
import EstimatesDeleteDialog from './EstimatesDeleteDialog';
import EstimatesActionPanel from './EstimatesActionPanel';
import { EstimateData, EstimateDraftData } from '../../../utils/types/EstimateInterfaces';
import { Link } from 'react-router-dom';

interface EstimateListItemProps {
    estimate: EstimateData | EstimateDraftData;
    type: string;
    handleEstimateDelete: (estimateId: string) => void;
    editLink: string;
    itemName: string;
}

const EstimateListItem: React.FC<EstimateListItemProps> = ({ estimate, handleEstimateDelete, editLink, itemName, type }) => {
    const displayDate = convertEpochTime(estimate._ts);
    const [open, setOpen] = useState(false);

    return (

        <List.Item
            actions={[
                <EstimatesActionPanel
                    estimate={estimate}
                    setOpen={setOpen}
                    editLink={editLink}
                    type={type}
                />
            ]}
        >

            <List.Item.Meta
                avatar={
                    <Link to={editLink}>
                        <Avatar icon={<FileTextOutlined />} />
                    </Link>}
                title={
                    <Link to={editLink}>
                        <Typography.Text style={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {(type === "draft" ? "[DRAFT] " : "") + estimate.estimateName}
                        </Typography.Text>
                    </Link>

                }
                description={
                    <Typography.Text style={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {displayDate}
                    </Typography.Text>
                }
            />

            <EstimatesDeleteDialog
                open={open}
                setOpen={setOpen}
                estimate={estimate}
                handleEstimateDelete={handleEstimateDelete}
                itemName={itemName}
            />

        </List.Item>
    );
};

export default EstimateListItem;
