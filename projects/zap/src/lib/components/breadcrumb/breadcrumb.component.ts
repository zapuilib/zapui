import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'zap-breadcrumb',
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class ZapBreadcrumb {
  items = input<{ label: string; url?: string }[]>([]);
  separator = input<'arrow' | 'chevron' | 'slash'>('chevron');
  gap = input<number>(0.5);
  size = input<'base' | 'compact' | 'tight'>('base');
  variant = input<'default' | 'muted'>('default');

  get classes(): string[] {
    return [this.size(), this.variant()];
  }
}
