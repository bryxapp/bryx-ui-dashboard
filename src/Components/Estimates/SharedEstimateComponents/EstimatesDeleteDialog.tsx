import React from 'react';
import { Modal, Typography, Button } from 'antd';
import { useTheme } from '@mui/material';
import { EstimateData, EstimateDraftData } from '../../../utils/types/EstimateInterfaces';

interface EstimatesDeleteDialogProps {
    setOpen: (open: boolean) => void;
    open: boolean;
    estimate: EstimateData | EstimateDraftData;
    handleEstimateDelete: (estimateId: string) => void;
    itemName: string;
}

const EstimatesDeleteDialog: React.FC<EstimatesDeleteDialogProps> = ({ setOpen, open, estimate, handleEstimateDelete, itemName }) => {
    const theme = useTheme();

    const handleConfirmDelete = () => {
        handleEstimateDelete(estimate.id);
        setOpen(false);
    };

    const handleCancelDelete = () => {
        setOpen(false);
    };

    return (
        <Modal
            open={open}
            onCancel={handleCancelDelete}
            footer={[
                <Button key="cancel" onClick={handleCancelDelete}>
                    Cancel
                </Button>,
                <Button key="delete" type="primary" danger onClick={handleConfirmDelete}>
                    Delete
                </Button>,
            ]}
        >
            <Typography.Text style={{ flexGrow: 1, padding: 2, color: theme.palette.text.primary }}>
                Are you sure you want to permanently delete this {itemName}?
            </Typography.Text>
        </Modal>
    );
};

export default EstimatesDeleteDialog;
