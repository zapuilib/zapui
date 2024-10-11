import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';
import { NgxZenConfig } from '../../interfaces/config.interface';

@Component({
  selector: 'ngx-zen-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
  @Output() removed = new EventEmitter<void>();
  @Input() text = '';
  @Input() zenClass: string = '';
  @Input() variant: 'outlined' | 'default' = 'default';
  @Input() size: 'small' | 'wide' | 'wider' = 'wide';
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() disabled = false;
  @Input() removable = false;

  constructor(@Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig) {}

  getStyle() {
    const isOutlined = this.variant === 'outlined';
    return {
      'background-color': isOutlined ? 'transparent' : this.config.colors.tertiary,
       color: isOutlined ? this.config.colors.tertiary : this.config.colors.primary, 
      'font-size': this.size === 'small' ? this.config.fontSize.xs : this.size === 'wide' ? this.config.fontSize.sm : this.config.fontSize.md,
    };
  }

  onRemove(event: Event) {
    event.stopPropagation();
    if (!this.disabled && this.removable) {
      this.removed.emit();
    }
  }
}