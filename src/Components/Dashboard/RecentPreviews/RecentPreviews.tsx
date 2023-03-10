import RecentPreview from './RecentPreview/RecentPreview';
import Grid from '@mui/material/Grid';
import NoneFound from '../../SharedComponents/NoneFound/NoneFound';

interface Props {
  objects: any[];
  url: string;
}

const RecentPreviews = ({ objects, url }: Props) => {
  if (objects.length === 0) {
    const type = url.includes('estimate') ? 'estimates' : 'templates';
    return <NoneFound item={type} />;
  }

  return (
    <Grid container spacing={2}>
      {objects.map((object: any) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={object.id}>
          <RecentPreview key={object.id} object={object} url={url} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RecentPreviews;
