import { InjectionToken } from '@angular/core';

export const PAGINATION_SHAPE_TOKEN = new InjectionToken<'pill' | 'curve' | 'flat'>(
  'PaginationShapeToken',
);
