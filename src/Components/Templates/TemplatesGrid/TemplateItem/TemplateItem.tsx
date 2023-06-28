import { useState } from 'react';
import { TemplateData } from '../../../../utils/types/TemplateInterfaces';
import { Paper, Link } from '@mui/material';
import PreviewStage from '../../../SharedComponents/PreviewStage/PreviewStage';
import TemplateDeleteDialog from './TemplateDeleteDialog';
import TemplateInfoBox from './TemplateInfoBox';

interface TemplateItemProps {
  template: TemplateData;
  handleTemplateDelete: any;
}

const TemplateItem = ({ template, handleTemplateDelete }: TemplateItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '20rem',
          width: '18rem',
          alignItems: 'center',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          background: 'primary.main',
        }}
      >
        <Link href={'/edit-template?templateId=' + template.id} underline="none">
          <div style={{ height: '1rem' }} />
          <PreviewStage canvasDesign={template.canvasDesign} scale={0.20} />
        </Link>
        <TemplateInfoBox template={template} setOpen={setOpen} />
      </Paper>
      <TemplateDeleteDialog template={template} handleTemplateDelete={handleTemplateDelete} open={open} setOpen={setOpen} />
    </>
  );
};

export default TemplateItem;
