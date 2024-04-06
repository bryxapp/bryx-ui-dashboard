import { Input, Typography } from 'antd';

interface EstimateNameProps {
  estimateName: string;
  setEstimateName: (newEstimateName: string) => void;
}

const EstimateName = ({ estimateName, setEstimateName }: EstimateNameProps) => {
  return (
    <>
    <Typography.Title level={5} style={{ margin: 0 }}>
      Estimate Name
    </Typography.Title>
    <Input
      placeholder="Estimate Name"
      value={estimateName}
      onChange={(event) => setEstimateName(event.target.value)}
      style={{ width: '40%' }}
      size="large"
    />
    </>
  );
};

export default EstimateName;
