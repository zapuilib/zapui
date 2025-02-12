import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'zap-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class ZapBadge {
  @Input() variant: 'empty' | 'default' | 'outlined' = 'default';
  @Input() type: 'default' | 'info' | 'success' | 'warning' | 'error' = 'default';
  @Input() count: number = 0;
  @Input() zapClass: string = '';

  getContent(): string | null {
    if (this.variant === 'empty') return null;
    return this.count > 99 ? '99+' : this.count.toString();
  }

  get classes(): string[] {
    return [
      this.type,
      this.variant,
      this.zapClass,
    ].filter((cls) => cls && cls !== 'default');
  }
}
