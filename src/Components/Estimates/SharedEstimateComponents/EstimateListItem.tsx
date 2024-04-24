import React, { useState } from 'react';
import { Typography, Avatar, Space, theme, Divider } from 'antd';
import { convertToDisplayDate } from '../../../utils/time-util';
import EstimatesDeleteDialog from './EstimatesDeleteDialog';
import EstimatesActionPanel from './EstimatesActionPanel';
import { EstimateData, EstimateDraftData } from '../../../utils/types/EstimateInterfaces';
import { Link } from 'react-router-dom';
import { FaFileInvoice } from "react-icons/fa6";

interface EstimateListItemProps {
    estimate: EstimateData | EstimateDraftData;
    type: string;
    handleEstimateDelete: (estimateId: string) => void;
    editLink: string;
    itemName: string;
}

const EstimateListItem: React.FC<EstimateListItemProps> = ({ estimate, handleEstimateDelete, editLink, itemName, type }) => {
    const displayDate = convertToDisplayDate(new Date(estimate.createdDate));
    const [open, setOpen] = useState(false);
    const {
        token: { colorPrimary },
    } = theme.useToken();


    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
                <Space>
                    <Link to={editLink}>
                        <Avatar style={{ backgroundColor: colorPrimary, alignItems: "center", justifyContent: "center" }} size="large" icon={<FaFileInvoice />}>
                        </Avatar>
                    </Link>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Link to={editLink}>
                            <Typography.Title level={4}
                                style={{ margin: 0 }}>
                                {(type === "draft" ? "[DRAFT] " : "") + estimate.estimateName}
                            </Typography.Title>
                        </Link>
                        <Typography.Text type="secondary">
                            {displayDate}
                        </Typography.Text>
                    </div>
                </Space>
                <EstimatesActionPanel
                    estimate={estimate}
                    setOpen={setOpen}
                    editLink={editLink}
                    type={type}
                />
                <EstimatesDeleteDialog
                    open={open}
                    setOpen={setOpen}
                    estimate={estimate}
                    handleEstimateDelete={handleEstimateDelete}
                    itemName={itemName}
                />
            </div>
            <Divider style={{ margin: 0 }} />
        </>

    );
};

export default EstimateListItem;
