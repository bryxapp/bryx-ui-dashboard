import { useState } from 'react';
import { TemplateData } from '../../../../../utils/types/TemplateInterfaces';
import PreviewStage from '../../../../SharedComponents/Templates/PreviewStage/PreviewStage';
import TemplateDeleteDialog from './TemplateDeleteDialog';
import { Link, useNavigate } from 'react-router-dom';
import TemplateCopyDialog from './TemplateCopyDialog';
import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { convertEpochTime } from '../../../../../utils/time-util';
import { EditOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons';

interface TemplateItemProps {
  template: TemplateData;
  handleTemplateDelete: any;
  handleTemplateCopy: any
  baseUrl: string;
  showActions: boolean;
}

const TemplateItem = ({ template, handleTemplateDelete, handleTemplateCopy, baseUrl, showActions }: TemplateItemProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openCopy, setOpenCopy] = useState(false);
  const displayDate = convertEpochTime(template._ts);
  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/edit-template?templateId=${template.id}`)
  }

  return (
    <>
      <Card
        style={{ width: 300 }}
        cover={
          <div style={{ paddingTop: "1rem" }}>
            <Link to={baseUrl + template.id}>
              <PreviewStage canvasDesign={template.canvasDesign} scale={0.20} />
            </Link>
          </div>
        }
        actions={showActions ? [
          <EditOutlined key='edit' onClick={handleEditClick} />,
          <CopyOutlined key='copy' onClick={() => { setOpenCopy(true) }} />,
          <DeleteOutlined key='delete' onClick={() => { setOpenDelete(true) }} />
        ] : []}
      >
        <Meta
          title={template.friendlyName}
          description={displayDate}
        />
      </Card>
      <TemplateDeleteDialog template={template} handleTemplateDelete={handleTemplateDelete} open={openDelete} setOpen={setOpenDelete} />
      <TemplateCopyDialog template={template} handleTemplateCopy={handleTemplateCopy} open={openCopy} setOpen={setOpenCopy} />
    </>
  );
};

export default TemplateItem;
