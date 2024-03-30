import { Input } from 'antd';

interface EstimateNameProps {
  estimateName: string;
  setEstimateName: (newEstimateName: string) => void;
}

const EstimateName = ({ estimateName, setEstimateName }: EstimateNameProps) => {
  return (
    <Input
      placeholder="Estimate Name"
      value={estimateName}
      onChange={(event) => setEstimateName(event.target.value)}
    />
  );
};

export default EstimateName;
