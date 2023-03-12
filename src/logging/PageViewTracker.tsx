import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logger from './logger';

const PageViewTracker = () => {
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname)
    logger.trackPageView({
      name: location.pathname,
      uri: location.pathname,
      properties: {
        title: document.title,
        environment: process.env.NODE_ENV,
      },
    });
  }, [location.pathname]);

  return null;
};

export default PageViewTracker;
