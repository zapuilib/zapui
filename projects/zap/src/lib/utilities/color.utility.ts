import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ColorUtility {
  hexToRgba(hex: string, alpha: number): string {
    const bigint = parseInt(hex?.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
