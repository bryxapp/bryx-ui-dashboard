import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const logger = new ApplicationInsights({
  config: {
    connectionString: process.env.REACT_APP_APPLICATIONINSIGHTS_CONNECTIONSTRING,
    enableAutoRouteTracking: true, // Set this to true if you want to track page views automatically
  },
});
logger.loadAppInsights();

export default logger;