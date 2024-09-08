import { Environment } from './environment.interface';
import { PORT } from './const';

export const environment: Environment = {
  production: false,
  apiUrl: `http://localhost:${PORT}/api/v1`,
};
