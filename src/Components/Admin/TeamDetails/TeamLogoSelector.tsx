import { Upload, Typography, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';

interface TeamLogoSelectorProps {
    currentLogoUrl: string | undefined;
    setNewLogo: (newLogo: File) => void;
}

const TeamLogoSelector = ({ currentLogoUrl, setNewLogo }: TeamLogoSelectorProps) => {
    const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>();
    const handleUploadChange = (info: any) => {
        setNewLogo(info.file);
        setThumbnailUrl(URL.createObjectURL(info.file));
    };

    return (
        <>
            <Typography.Text strong>Team Logo</Typography.Text>
            <Upload
                beforeUpload={() => { return false }}
                onChange={handleUploadChange}
                showUploadList={false}
                maxCount={1}
                accept="image/*"
            >
                {currentLogoUrl || thumbnailUrl ? (
                    <Image
                        src={thumbnailUrl || currentLogoUrl}
                        width={64}
                        height={64}
                        style={{ cursor: 'pointer' }}
                        preview={false}
                    />
                ) : (
                    <div style={{ width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #d9d9d9', cursor: 'pointer' }}>
                        <UploadOutlined />
                    </div>
                )}
            </Upload>
        </>
    );
};

export default TeamLogoSelector;
