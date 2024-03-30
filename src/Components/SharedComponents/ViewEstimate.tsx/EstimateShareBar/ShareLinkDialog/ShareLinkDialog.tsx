import React, { useState } from 'react';
import { Modal, Typography, Button } from 'antd';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { EstimateData } from '../../../../../utils/types/EstimateInterfaces';

const { Title, Text } = Typography;

interface Props {
    estimate: EstimateData;
    open: boolean;
    onClose: () => void;
}

const ShareLinkDialog: React.FC<Props> = ({ estimate, open, onClose }) => {
    const [copied, setCopied] = useState(false);
    const copyLinkBaseURL = "https://dashboard.bryxbids.com/view/?estimateId=";

    const handleCopyToClipboard = () => {
        if (!estimate.id) {
            console.error("Estimate ID is undefined");
            return;
        }
        navigator.clipboard.writeText(`${copyLinkBaseURL}${estimate.id}`)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(err => {
                console.error("Error copying link: ", err);
            });
    };

    return (
        <Modal
            open={open}
            onCancel={onClose}
            footer={null}
            centered
            title={<Title level={4}>Share Link for '{estimate.estimateName}'</Title>}
            width={700}
        >
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <div style={{ padding: '20px', background: '#f0f2f5', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ marginRight: 10 }}>
                        {`${copyLinkBaseURL}${estimate.id}`}
                    </Text>
                </div>
                <div style={{ padding: '20px' }}>
                    <Button style={{ width: "6rem" }} type="primary" onClick={handleCopyToClipboard} icon={copied ? <CheckOutlined /> : <CopyOutlined />}>
                        {copied ? 'Copied' : 'Copy'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ShareLinkDialog;
