import { Component, Input, Inject } from '@angular/core';
import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';
import { NgxZenConfig } from '../../interfaces/config.interface';

@Component({
  selector: 'ngx-zen-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  @Input() variant: 'empty' | 'content' | 'border' = 'empty';
  @Input() count: number = 0;
  @Input() zenClass: string = '';

  constructor(@Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig) {}

  getNotificationContent(): string | null {
    if (this.variant === 'empty') return null;
    return this.count > 99 ? '99+' : this.count.toString();
  }
  getStyle() {
    return {
      'background-color': this.config.colors.tertiary,
      color: this.variant === 'border' ? this.config.colors.primary : this.config.colors.primary,
      'font-size': this.config.fontSize.xs,
    };
  }
}