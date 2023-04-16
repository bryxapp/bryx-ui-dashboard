import React, { useEffect, useState } from 'react';
import RecentPreview from './RecentPreview/RecentPreview';
import Grid from '@mui/material/Grid';
import NoneFound from '../../SharedComponents/NoneFound/NoneFound';
import { TemplateData } from '../../../utils/types/TemplateInterfaces';
import { EstimateData } from '../../../utils/types/EstimateInterfaces';
interface RecentPreviewProps {
  objects: TemplateData[] | EstimateData[];
  url: string;
}

const RecentPreviews = ({ objects, url }: RecentPreviewProps) => {
  const [numberOfItems, setNumberOfItems] = useState(1);

  useEffect(() => {
    const updateNumberOfItems = () => {
      const containerWidth = window.innerWidth;
      const itemWidth = 23 * 16; // 14rem converted to pixels
      const itemsPerRow = Math.floor(containerWidth / itemWidth);
      setNumberOfItems(itemsPerRow);
    };

    updateNumberOfItems(); // Update on initial render
    window.addEventListener('resize', updateNumberOfItems); // Update on window resize

    return () => {
      // Clean up the event listener
      window.removeEventListener('resize', updateNumberOfItems);
    };
  }, []);

  // Slice the objects array to display a limited number of items
  const limitedObjects = objects.slice(0, numberOfItems);

  if (objects.length === 0) {
    const type: string = url.includes('template') ? 'templates' : 'estimates';
    return <NoneFound item={type} />;
  }

  return (
    <Grid container spacing={2}>
      {limitedObjects.map((object: TemplateData | EstimateData) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={object.id}>
          <RecentPreview key={object.id} object={object} url={url} />
        </Grid>
      ))}
    </Grid>
  );
};

export default RecentPreviews;
