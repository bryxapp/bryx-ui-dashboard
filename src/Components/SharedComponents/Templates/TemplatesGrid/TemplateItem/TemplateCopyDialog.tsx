import { Modal, Typography, Button } from 'antd';
import { TemplateData } from '../../../../../utils/types/TemplateInterfaces';

interface TemplateDeleteDialogProps {
    template: TemplateData;
    handleTemplateCopy: any;
    open: boolean;
    setOpen: (open: boolean) => void; // More specific type for setOpen
}

const TemplateCopyDialog = ({ template, handleTemplateCopy, open, setOpen }: TemplateDeleteDialogProps) => {
    const handleConfirmCopy = () => {
        handleTemplateCopy(template.id);
        setOpen(false);
    };

    const handleCancelCopy = () => {
        setOpen(false);
    };

    return (
        <Modal
            title="Copy Template"
            open={open}
            onCancel={handleCancelCopy}
            footer={[
                <Button key="back" onClick={handleCancelCopy}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleConfirmCopy}>
                    Copy
                </Button>,
            ]}
        >
            <Typography.Text>
                Do you want to make a copy of this template?
            </Typography.Text>
        </Modal>
    );
};

export default TemplateCopyDialog;
