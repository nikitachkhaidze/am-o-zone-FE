import { InjectionToken } from '@angular/core';
import { Environment } from '../../../environments/environment.interface';

export const ENVIRONMENT_CONFIG = new InjectionToken<Environment>('environment');
