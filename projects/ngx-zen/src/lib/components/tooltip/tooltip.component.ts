import { Component, Inject, Input } from '@angular/core';
import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';
import { NgxZenConfig } from '../../interfaces/config.interface';

@Component({
  selector: 'ngx-zen-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  @Input() icon: string = '';
  @Input() text: string = '';
  @Input() variant: 'classic' | 'default' = 'default';
  @Input() positionX: 'left' | 'x-center' | 'right' = 'right';
  @Input() positionY: 'top' | 'y-center' | 'bottom' = 'bottom';
  @Input() zenClass: string = '';
  isActive: boolean = false;

  constructor(@Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig) {}

  getIconStyle(): any {
    return {
      'background-color': this.config.colors.secondary,
      'border-color': this.config.colors.secondary,
      'font-size': this.config.fontSize.xxs,
      color: this.config.colors.primary,
    };
  }

  getContentStyle(): any {
    return {
      'background-color': this.config.colors.secondary,
      'border-color': this.config.colors.secondary,
      'font-size': this.config.fontSize.sm,
      color: this.config.colors.primary,
    };
  }

  getPointerStyle(): any {
    return {
      'background-color': this.config.colors.secondary,
    };
  }

  toggle(): void {
    this.isActive = !this.isActive;
  }
}
