import { Link, Paper, Typography } from '@mui/material';
import Feed from '@mui/icons-material/FeedOutlined';
import { TemplateData } from '../../../../../../utils/types/TemplateInterfaces';

interface SelectTemplateListItemProps {
  template: TemplateData;
}

const SelectTemplateListItem = ({ template }: SelectTemplateListItemProps) => {
  return (
    <Link href={'/form?templateId=' + template.id} underline="none">
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '14rem',
          width: '14rem',
          alignItems: 'center',
        }}
      >
        <Feed sx={{ fontSize: '8rem', color: 'gray' }} />
        <Paper
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            height: '5rem',
            width: '100%',
            backgroundColor: 'gray',
            p: '0.5rem',
          }}
        >
          <Typography
            variant="h5"
            color="white"
            gutterBottom
            sx={{
              textAlign: 'center',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              width: '100%',
            }}
          >
            {template.friendlyName}
          </Typography>
        </Paper>
      </Paper>
    </Link>
  );
};

export default SelectTemplateListItem;
