import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { EstimateData } from '../../../utils/types/EstimateInterfaces';
import { TemplateData } from '../../../utils/types/TemplateInterfaces';
import { Button } from '@mui/material';
import NoneFound from '../../SharedComponents/NoneFound/NoneFound';
import EstimateRecentPreview from './RecentPreview/EstimateRecentPreview';
import TemplateRecentPreview from './RecentPreview/TemplateRecentPreview';

interface RecentPreviewProps {
  estimates?: EstimateData[];
  templates?: TemplateData[];
  type: 'estimate' | 'template';
}

const RecentPreviews = ({ estimates = [], templates = [], type }: RecentPreviewProps) => {
  const [numberOfItems, setNumberOfItems] = useState(1);

  useEffect(() => {
    const updateNumberOfItems = () => {
      const containerWidth = window.innerWidth;
      const itemWidth = 23 * 16; // 14rem converted to pixels
      const itemsPerRow = Math.min(4, Math.floor(containerWidth / itemWidth));
      setNumberOfItems(itemsPerRow);
    };

    updateNumberOfItems(); // Update on initial render
    window.addEventListener('resize', updateNumberOfItems); // Update on window resize

    return () => {
      // Clean up the event listener
      window.removeEventListener('resize', updateNumberOfItems);
    };
  }, []);

  if (type === 'estimate' && estimates.length === 0) {
    return <NoneFound item={'estimates'} />;
  }

  if (type === 'template' && templates.length === 0) {
    return <NoneFound item={'templates'} />;
  }

  // Slice the objects array to display a limited number of items
  const limitedObjects = type === 'estimate' ? estimates.slice(0, numberOfItems) : templates.slice(0, numberOfItems);

  return (
    <Grid container spacing={2}>
      {limitedObjects.map((item: EstimateData | TemplateData) => (
        <Grid item xs={12} sm={6} md={type === 'estimate' ? 4 : 3} lg={3} key={item.id}>
          {type === 'estimate' ? (
            <EstimateRecentPreview key={item.id} estimate={item as EstimateData} />
          ) : (
            <TemplateRecentPreview key={item.id} template={item as TemplateData} />
          )}
        </Grid>
      ))}
      <Grid item xs={12}>
        <Button href="/choose-canvas-starter" variant='outlined' color='primary' >
          + New {type === 'estimate' ? 'Estimate' : 'Template'}
        </Button>
      </Grid>
    </Grid>
  );
};

export default RecentPreviews;
