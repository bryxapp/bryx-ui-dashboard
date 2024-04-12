import { Form, Input, Typography } from 'antd';

interface EstimateNameProps {
  estimateName: string;
  setEstimateName: (newEstimateName: string) => void;
}

const EstimateName = ({ estimateName, setEstimateName }: EstimateNameProps) => {
  return (
    <Form.Item
      style={{ margin: 0 }}
      required>
      <Typography.Title level={5} style={{ margin: 0 }}>Estimate Name</Typography.Title>
      <Input
        placeholder="Estimate Name"
        value={estimateName}
        onChange={(event) => setEstimateName(event.target.value)}
        style={{ width: '80%' }}
        size="large"
      />
    </Form.Item>
  );
};

export default EstimateName;
