import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const logger = new ApplicationInsights({
  config: {
    connectionString: process.env.REACT_APP_APPLICATIONINSIGHTS_CONNECTIONSTRING,
  },
});
logger.loadAppInsights();

export default logger;