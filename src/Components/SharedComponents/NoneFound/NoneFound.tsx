import { Empty, Typography } from 'antd';

interface NoneFoundProps {
    item: string;
}

const NoneFound = ({ item }: NoneFoundProps) => {
    return (
        <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 100 }}
            description={
                <Typography.Title level={5}>
                    No {item} found
                </Typography.Title>
            }
        >
        </Empty>
    );
}

export default NoneFound;