import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';

import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';
import { NgxZenConfig } from '../../interfaces/config.interface';
import { Styles } from '../../interfaces/style.interface';

@Component({
  selector: 'ngx-zen-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
  @Output() dissmiss = new EventEmitter<void>();
  @Input() text = 'Chip';
  @Input() zenClass: string = '';
  @Input() variant: 'outlined' | 'default' = 'default';
  @Input() size: 'small' | 'wide' | 'wider' = 'wide';
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() disabled = false;
  @Input() dismissible = false;

  constructor(@Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig) {}

  getStyle(): Styles {
    const isOutlined = this.variant === 'outlined';
    return {
      backgroundColor: isOutlined ? 'transparent' : this.config.colors.tertiary,
      color: isOutlined
        ? this.config.colors.tertiary
        : this.config.colors.primary,
      borderColor: isOutlined ? this.config.colors.tertiary : 'transparent',
      fontSize:
        this.size === 'small'
          ? this.config.fontSize.xs
          : this.size === 'wide'
          ? this.config.fontSize.sm
          : this.config.fontSize.md,
    };
  }

  getTextStyle(): Styles {
    const isOutlined = this.variant === 'outlined';
    return {
      color: isOutlined
        ? this.config.colors.tertiary
        : this.config.colors.primary,
    };
  }

  onRemove(event: Event) {
    event.stopPropagation();
    if (!this.disabled && this.dismissible) {
      this.dissmiss.emit();
    }
  }
}
