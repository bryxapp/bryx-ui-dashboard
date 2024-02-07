import { useState } from 'react';
import { TemplateData } from '../../../../../utils/types/TemplateInterfaces';
import { Paper } from '@mui/material';
import PreviewStage from '../../../../SharedComponents/Templates/PreviewStage/PreviewStage';
import TemplateDeleteDialog from './TemplateDeleteDialog';
import TemplateInfoBox from './TemplateInfoBox';
import { useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import TemplateCopyDialog from './TemplateCopyDialog';

interface TemplateItemProps {
  template: TemplateData;
  handleTemplateDelete: any;
  handleTemplateCopy:any
  baseUrl: string;
  showActions: boolean;
}

const TemplateItem = ({ template, handleTemplateDelete, handleTemplateCopy, baseUrl, showActions }: TemplateItemProps) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openCopy, setOpenCopy] = useState(false);
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
        <TemplateInfoBox template={template} setOpenDelete={setOpenDelete} setOpenCopy={setOpenCopy} showActions={showActions} />
      </Paper>
      <TemplateDeleteDialog template={template} handleTemplateDelete={handleTemplateDelete} open={openDelete} setOpen={setOpenDelete} />
      <TemplateCopyDialog template={template} handleTemplateCopy={handleTemplateCopy} open={openCopy} setOpen={setOpenCopy} />
    </>
  );
};

export default TemplateItem;
