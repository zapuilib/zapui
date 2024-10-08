import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';
import { NgxZenConfig } from '../../interfaces/config.interface';

type ChipType = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'filled' | 'gradient' | 'ghost';

@Component({
  selector: 'ngx-zen-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
  @Input() text = '';
  @Input() zenClass: string = '';
  @Input() type: ChipType = 'primary';
  @Input() variant: 'outlined' | 'default' = 'default';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() avatar?: string;
  @Input() status?: 'online' | 'offline';
  @Input() disabled = false;
  @Input() removable = false;

  @Output() removed = new EventEmitter<void>();

  constructor(@Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig) {}

  getStyle() {
    const isOutlined = this.variant === 'outlined';
    return {
      'background-color': isOutlined ? 'transparent' : this.config.colors.tertiary,
      color: isOutlined ? 'black' : this.config.colors.primary, 
      'border-color': isOutlined ? this.config.colors.tertiary : 'transparent',
      'border-width': isOutlined ? '1px' : '0',
      'border-style': 'solid',
      'font-size': this.size === 'small' ? this.config.fontSize.xs : this.config.fontSize.sm,
    };
  }

  onRemove(event: Event) {
    event.stopPropagation();
    if (!this.disabled && this.removable) {
      this.removed.emit();
    }
  }
}