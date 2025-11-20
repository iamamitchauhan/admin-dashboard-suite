import { environmentDev } from './environment.dev';
import { environmentProduction } from './environment.production';

// Read environment from Vite environment variables
const currentEnvironment = import.meta.env.VITE_ENVIRONMENT || 'development';

// Export the appropriate environment based on VITE_ENVIRONMENT flag
export const environment = currentEnvironment === 'production' 
  ? environmentProduction 
  : environmentDev;

// Log current environment in console (only in development)
if (!environment.production) {
  console.log('🌍 Current Environment:', currentEnvironment);
  console.log('⚙️ Environment Config:', environment);
}
