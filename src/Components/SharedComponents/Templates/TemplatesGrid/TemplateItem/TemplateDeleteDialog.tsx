import { Modal, Typography, Button } from 'antd'; // Import Modal, Typography, Button from antd
import { TemplateData } from '../../../../../utils/types/TemplateInterfaces';

interface TemplateDeleteDialogProps {
    template: TemplateData;
    handleTemplateDelete: any;
    open: boolean;
    setOpen: (open: boolean) => void; // Specify a more precise type for setOpen
}

const TemplateDeleteDialog = ({ template, handleTemplateDelete, open, setOpen }: TemplateDeleteDialogProps) => {
    const handleConfirmDelete = () => {
        handleTemplateDelete(template.id);
        setOpen(false);
    };

    const handleCancelDelete = () => {
        setOpen(false);
    };

    return (
        <Modal
            title="Delete Template"
            open={open}
            onCancel={handleCancelDelete}
            footer={[
                <Button key="back" onClick={handleCancelDelete}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" danger onClick={handleConfirmDelete}>
                    Delete
                </Button>
            ]}
        >
            <Typography.Text>
                Are you sure you want to permanently delete this template?
            </Typography.Text>
        </Modal>
    );
};

export default TemplateDeleteDialog;
