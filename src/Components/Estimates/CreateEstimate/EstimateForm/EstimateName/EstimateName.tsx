import { Button, Form, Input, Tooltip, Typography, message } from 'antd';
import { TbEdit } from 'react-icons/tb';
import { useAuth0User } from '../../../../../utils/customHooks/useAuth0User';
import { updateTemplate } from '../../../../../utils/api/templates-api';
import { useState } from 'react';
import { useCanvasDesignContext } from '../../../../../utils/contexts/canvasDesignContext';

interface EstimateNameProps {
  estimateName: string;
  setEstimateName: (newEstimateName: string) => void;
  editing: boolean;
  setEditing: (editing: boolean) => void;
  templateId: string;
  templateFriendlyName: string;
}

const EstimateName = ({ estimateName, setEstimateName, editing, setEditing, templateId, templateFriendlyName }: EstimateNameProps) => {
  const { canvasDesign } = useCanvasDesignContext();
  const [loading, setLoading] = useState(false);
  const handleEnableOrderEditing = () => {
    setEditing(true);
  };

  const { getAccessToken } = useAuth0User();

  const handeSaveOrder = async () => {
    try {
      setLoading(true);
      const token = await getAccessToken()
      if (!token) return;
      await updateTemplate(templateId, canvasDesign, templateFriendlyName, token);
      message.success({
        content: "Form order saved",
        duration: 3, // Duration in seconds
      });
    } catch (error) {
      message.error({
        content: "Error saving form order",
        duration: 3, // Duration in seconds
      });
    }
    finally {
      setEditing(false);
      setLoading(false);
    }
  }

  return (
    <div style={{ marginBottom: 10 }}>
      <Typography.Text type="secondary">Template: {templateFriendlyName}</Typography.Text>
      <Form.Item
        style={{ margin: 0 }}
        required>
        <div style={{ flex: 2, display: "flex", justifyContent: "space-between", alignContent:"flex-end", marginBottom:8 }}>
          <Typography.Title level={4} style={{ margin: 0 }}>Estimate Name</Typography.Title>
          {!editing && (
            <Tooltip title="Edit Form">
              <Button type="link" onClick={handleEnableOrderEditing}><TbEdit size={'1.5em'} /></Button>
            </Tooltip>
          )}
          {editing && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button  type="primary" onClick={handeSaveOrder} disabled={loading}>Save</Button>
              <div style={{ width: '5px' }} />
              <Button type="primary" danger onClick={() => setEditing(false)} disabled={loading}>Cancel</Button>
            </div>
          )}
        </div>
        <Input
          placeholder="Estimate Name"
          value={estimateName}
          onChange={(event) => setEstimateName(event.target.value)}
          size="large"
        />
      </Form.Item>

    </div>
  );
};

export default EstimateName;
