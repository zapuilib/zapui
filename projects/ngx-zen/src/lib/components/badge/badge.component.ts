import { Component, Input, Inject } from '@angular/core';
import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';
import { NgxZenConfig } from '../../interfaces/config.interface';
import { Styles } from '../../interfaces/style.interface';

@Component({
  selector: 'ngx-zen-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent {
  @Input() variant: 'empty' | 'content' | 'border' = 'content';
  @Input() count: number = 0;
  @Input() zenClass: string = '';

  constructor(@Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig) {}

  getContent(): string | null {
    if (this.variant === 'empty') return null;
    return this.count > 99 ? '99+' : this.count.toString();
  }

  getStyle(): Styles {
    return {
      backgroundColor: this.config.colors.tertiary,
      color: this.variant === 'border' ? this.config.colors.primary : this.config.colors.primary,
      fontSize: this.config.fontSize.xs,
    };
  }

}
