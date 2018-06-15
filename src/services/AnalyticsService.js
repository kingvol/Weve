import Analytics from 'appcenter-analytics';
import { DB_ENV } from '../env/vars';

const AnalyticsSimulator = {
  trackEvent(name) {
    console.log(`INFO: [Simulated]: Tracking of ${name} event`);
  },
};

module.exports = DB_ENV === 'production' ? Analytics : AnalyticsSimulator;
