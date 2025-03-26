import { InjectionToken } from '@angular/core';
import { ZapConfig } from '../interfaces/config.interface';

export const ZAP_CONFIG = new InjectionToken<ZapConfig>('ZapConfig');
