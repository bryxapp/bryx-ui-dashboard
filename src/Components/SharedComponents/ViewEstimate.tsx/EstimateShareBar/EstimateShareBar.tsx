import { Button, Tooltip } from 'antd';
import { LinkOutlined, FilePdfOutlined } from '@ant-design/icons';
import { createEstimatePDF } from '../../../../utils/api/estimates-api';
import ShareLinkDialog from './ShareLinkDialog/ShareLinkDialog';
import { useState } from 'react';
import { Spin } from 'antd';
import { useEffect } from 'react';

const EstimateShareBar = ({ estimate }: any) => {
    const [shareDialogOpen, setShareDialogOpen] = useState(false);
    const [pdfLoading, setPdfLoading] = useState(false);
    const [pdfUrl, setPdfUrl] = useState('');

    const handlePdfClick = async () => {
        if (!estimate) return;
        if (estimate.estimatePdfUrl) {
            window.open(estimate?.estimatePdfUrl, '_blank');
        } else if (pdfUrl) {
            window.open(pdfUrl, '_blank');
        } else {
            setPdfLoading(true);
            try {
                const res = await createEstimatePDF(estimate);
                if (res.estimatePdfUrl) {
                    setPdfUrl(res.estimatePdfUrl);
                    window.open(res.estimatePdfUrl, '_blank');
                }
            } catch (error) {
                console.log('Error creating PDF', error);
            } finally {
                setPdfLoading(false);
            }
        }
    };

    const handleOpenShareDialog = () => {
        setShareDialogOpen(true);
    };

    useEffect(() => {
        if (pdfUrl) {
            window.open(pdfUrl, '_blank');
        }
    }, [pdfUrl]);

    return (
        <div style = {{display: 'flex', justifyContent: 'space-between', width: '7rem'}}>
            <Tooltip title="Share Link" placement='bottom'>
                <Button onClick={handleOpenShareDialog} size='large'>
                    <LinkOutlined />
                </Button>
            </Tooltip>
            <Tooltip title="Create a PDF" placement='bottom'>
                <Button onClick={handlePdfClick} size='large'>
                    {pdfLoading ? <Spin /> : <FilePdfOutlined />}
                </Button>
            </Tooltip>
            <ShareLinkDialog estimate={estimate} open={shareDialogOpen} onClose={() => setShareDialogOpen(false)} />
        </div>
    );
};

export default EstimateShareBar;
