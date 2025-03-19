import { InjectionToken } from '@angular/core';
import { ZapConfig } from '../interfaces/config.interface';

export const NGX_ZAP_CONFIG = new InjectionToken<ZapConfig>('ZapConfig');
