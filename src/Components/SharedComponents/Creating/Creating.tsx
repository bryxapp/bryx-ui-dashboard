import { Progress, Typography } from 'antd';

const Creating = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <Typography.Title level={4}>
                Creating...
            </Typography.Title>
            <Progress percent={100} showInfo={false} status="active" />
        </div>
    );
}

export default Creating;
