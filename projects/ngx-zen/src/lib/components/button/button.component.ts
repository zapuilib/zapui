import { Component, Inject, Input } from '@angular/core';
import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';
import { NgxZenConfig } from '../../interfaces/config.interface';

@Component({
  selector: 'ngx-zen-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() text = 'Submit';
  @Input() theme: 'light' | 'dark' = 'light';
  @Input() zenClass: string = '';
  @Input() shape: 'pill' | 'curve' | 'default' = 'default';
  @Input() size: 'compact' | 'wide' | 'tight' | 'default' = 'default';
  @Input() type: 'icononly' | 'default' = 'default';
  @Input() icon!: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() variant: 'outlined' | 'default' | 'link' = 'default';
  @Input() disabled: boolean = false;

  constructor(@Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig) {}

  getStyle() {
    return {
      'background-color': this.config.colors.tertiary,
      color:
        this.variant === 'link'
          ? this.config.colors.tertiary
          : this.variant === 'outlined'
          ? this.config.colors.tertiary
          : this.config.colors.primary,
      'border-color': this.variant === 'outlined' ? this.config.colors.tertiary : 'transparent',
      'font-size': this.size === 'tight' ? this.config.fontSize.xs : this.config.fontSize.md,
    };
  }
}
