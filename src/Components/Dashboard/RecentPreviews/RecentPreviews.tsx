import RecentPreview from './RecentPreview/RecentPreview';
import Grid from '@mui/material/Grid';
import NoneFound from '../../SharedComponents/NoneFound/NoneFound';
import { TemplateData } from '../../../utils/types/TemplateCreationInterfaces';
import { EstimateData } from '../../../utils/types/EstimateInterfaces';
interface RecentPreviewProps {
  objects: TemplateData[] | EstimateData[];
  url: string;
}

const RecentPreviews = ({ objects, url }: RecentPreviewProps) => {
  if (objects.length === 0) {
    const type:string = url.includes('templates') ? 'templates' : 'estimates';
    return <NoneFound item={type} />;
  }

  return (
    <Grid container spacing={2}>
      {objects.map((object: TemplateData | EstimateData) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={object.id}>
          <RecentPreview key={object.id} object={object} url={url} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RecentPreviews;
