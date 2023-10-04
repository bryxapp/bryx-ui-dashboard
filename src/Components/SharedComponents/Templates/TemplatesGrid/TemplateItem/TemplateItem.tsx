import { useState } from 'react';
import { TemplateData } from '../../../../../utils/types/TemplateInterfaces';
import { Paper } from '@mui/material';
import PreviewStage from '../../../../SharedComponents/Templates/PreviewStage/PreviewStage';
import TemplateDeleteDialog from './TemplateDeleteDialog';
import TemplateInfoBox from './TemplateInfoBox';
import { useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

interface TemplateItemProps {
  template: TemplateData;
  handleTemplateDelete: any;
  baseUrl: string;
  showActions: boolean;
}

const TemplateItem = ({ template, handleTemplateDelete, baseUrl, showActions }: TemplateItemProps) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  return (
    <>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: showActions ? '19rem' : '17rem',
          width: showActions ? '18rem' : '16rem',
          alignItems: 'center',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          background: theme.palette.secondary.main,
        }}
      >
        <Link to={baseUrl + template.id}>
          <div style={{ height: '1rem' }} />
          <PreviewStage canvasDesign={template.canvasDesign} scale={0.20} />
        </Link>
        <TemplateInfoBox template={template} setOpen={setOpen} showActions={showActions} />
      </Paper>
      <TemplateDeleteDialog template={template} handleTemplateDelete={handleTemplateDelete} open={open} setOpen={setOpen} />
    </>
  );
};

export default TemplateItem;
