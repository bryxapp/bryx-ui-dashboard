import { Typography, Card } from 'antd';
import TemplatesGrid from "../../../SharedComponents/Templates/TemplatesGrid/TemplatesGrid";

const { Title } = Typography;

const SelectTemplate = () => {
    return (
        <>
            <Title level={3}>
                Select a Template
            </Title>
            <div style={{ height: 50 }} />
            <Card>
                <TemplatesGrid
                    setMaxTemplatesReached={null}
                    baseUrl='/form?templateId=' />
            </Card>
        </>
    )
}

export default SelectTemplate;
