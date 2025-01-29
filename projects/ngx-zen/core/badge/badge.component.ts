import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-zen-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class ZenBadgeComponent {
  @Input() variant: 'empty' | 'default' | 'outlined' = 'default';
  @Input() type: 'default' | 'info' | 'success' | 'warning' | 'error' = 'default';
  @Input() count: number = 0;
  @Input() zenClass: string = '';

  getContent(): string | null {
    if (this.variant === 'empty') return null;
    return this.count > 99 ? '99+' : this.count.toString();
  }

  get classes(): string[] {
    return [
      this.type,
      this.variant,
      this.zenClass,
    ].filter((cls) => cls && cls !== 'default');
  }
}
