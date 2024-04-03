import { Spin, Typography } from 'antd';

const Saving = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <Typography.Title level={4}>
                Saving... <Spin />
            </Typography.Title>
        </div>
    );
}

export default Saving;