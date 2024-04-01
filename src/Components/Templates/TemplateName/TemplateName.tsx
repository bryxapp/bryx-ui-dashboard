import { Input } from "antd";


interface TemplateNameProps {
  friendlyName: string;
  setFriendlyName: React.SetStateAction<any>;
}

const TemplateName = ({ friendlyName, setFriendlyName }: TemplateNameProps) => {
  return (
    <Input
    addonBefore="Template Name"
    size="large"
      value={friendlyName}
      onChange={(event) => setFriendlyName(event.target.value)}
      style={{ width: '30%' }}
      placeholder="Template Name" // Placeholder used to mimic the label behavior
    />
  )
};

export default TemplateName;