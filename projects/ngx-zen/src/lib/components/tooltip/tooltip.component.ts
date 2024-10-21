import { Component, Inject, Input, TemplateRef } from '@angular/core';

import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';

import type { NgxZenConfig } from '../../interfaces/config.interface';
import type { Styles } from '../../interfaces/style.interface';

@Component({
  selector: 'ngx-zen-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  @Input() icon: string = '';
  @Input() text: string = '';
  @Input() shape: 'curve' | 'default' = 'default';
  @Input() size: 'small' | 'default' = 'default';
  @Input() positionX: 'left' | 'x-center' | 'right' = 'right';
  @Input() positionY: 'top' | 'y-center' | 'bottom' = 'bottom';
  @Input() template: TemplateRef<any> | null = null;
  @Input() zenClass: string = '';
  isActive: boolean = false;

  constructor(@Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig) {}

  getIconStyle(): Styles {
    return {
      backgroundColor: this.config.colors.secondary,
      borderColor: this.config.colors.secondary,
      fontSize: this.config.fontSize.xxs,
      color: this.config.colors.primary,
    };
  }

  getContentStyle(): Styles {
    return {
      backgroundColor: this.config.colors.secondary,
      borderColor: this.config.colors.secondary,
      fontSize: this.config.fontSize.sm,
      color: this.config.colors.primary,
    };
  }

  getPointerStyle(): Styles {
    return {
      backgroundColor: this.config.colors.secondary,
    };
  }

  toggle(): void {
    this.isActive = !this.isActive;
  }
}
