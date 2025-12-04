import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'zap-badge',
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class ZapBadge {
  variant = input<'empty' | 'default' | 'outlined'>('default');
  type = input<'default' | 'info' | 'success' | 'warning' | 'error'>('default');
  count = input<number>(0);
  zapClass = input<string>('');

  getContent(): string | null {
    if (this.variant() === 'empty') return null;
    return this.count() > 99 ? '99+' : this.count().toString();
  }

  get classes(): string[] {
    return [this.type(), this.variant(), this.zapClass()].filter((cls) => cls && cls !== 'default');
  }
}
