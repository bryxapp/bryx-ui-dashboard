import { Typography } from 'antd';

interface NoneFoundProps {
    item: string;
}

const NoneFound = ({ item }: NoneFoundProps) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <Typography.Text>
                No {item} found
            </Typography.Text>
        </div>
    );
}

export default NoneFound;