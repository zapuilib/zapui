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
  @Input() zenClass = '';
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

  get classes(): string[] {
    return [
      'ngx-zen-chip',
      this.type,
      this.variant,
      this.size,
      this.zenClass,
      this.disabled ? 'disabled' : '',
      this.status ? this.status : '',
      this.removable ? 'removable' : ''
    ].filter(Boolean);
  }

  getStyle() {
    const isOutlined = this.variant === 'outlined';
    const backgroundColor = isOutlined ? 'transparent' : this.config.colors.tertiary;
    const textColor = isOutlined ? this.config.colors.tertiary : this.config.colors.primary;
    
    return {
      'background-color': backgroundColor,
      color: textColor,
      'border-color': isOutlined ? this.config.colors.tertiary : 'transparent',
      'border-width': isOutlined ? '1px' : '0',
      'border-style': 'solid',
      'font-size': this.size === 'small' ? this.config.fontSize.xs : this.config.fontSize.sm,
    };
  }

  private getBackgroundColor(): string {
    if (this.variant === 'outlined' || this.type === 'ghost') return 'transparent';
    if (this.type === 'gradient') return `linear-gradient(to right, ${this.config.colors.primary}, ${this.config.colors.secondary})`;
    return this.config.colors[this.type as keyof typeof this.config.colors] || this.config.colors.tertiary;
  }

  private getTextColor(): string {
    if (this.variant === 'outlined' || this.type === 'ghost') {
      return this.config.colors.tertiary;
    }
    return this.config.colors.primary;
  }

  private getBorderColor(): string {
    return this.variant === 'outlined' ? this.config.colors.tertiary : 'transparent';
  }

  private getFontSize(): string {
    switch (this.size) {
      case 'small': return this.config.fontSize.xs;
      case 'large': return this.config.fontSize.lg;
      default: return this.config.fontSize.sm;
    }
  }

  onRemove(event: Event) {
    event.stopPropagation();
    if (!this.disabled && this.removable) {
      this.removed.emit();
    }
  }
}