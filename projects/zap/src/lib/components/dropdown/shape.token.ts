import { InjectionToken } from '@angular/core';

export const SHAPE_TOKEN = new InjectionToken<'pill' | 'curve' | 'flat'>('ShapeToken');
