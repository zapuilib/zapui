import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-zen-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ZenChipComponent implements OnInit {
  @Output() dissmiss = new EventEmitter<void>();
  @Input() text = 'Chip';
  @Input() zenClass: string = '';
  @Input() variant: 'outlined' | 'default' = 'default';
  @Input() shape!: 'pill' | 'curve' | 'default';
  @Input() size: 'default' | 'small' | 'wide' = 'default';
  @Input() type: 'default' | 'info' | 'success' | 'warning' | 'error' =
    'default';
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() disabled = false;
  @Input() dismissible = false;

  private globalConfig: { shape: string } = {
    shape: '',
  };

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const rootStyles = getComputedStyle(document.documentElement);
      this.globalConfig.shape = rootStyles
        .getPropertyValue('--zen-shape')
        .trim();
    }
  }

  onRemove(event: Event) {
    event.stopPropagation();
    if (!this.disabled && this.dismissible) {
      this.dissmiss.emit();
    }
  }

  get classes(): string[] {
    return [
      this.type,
      this.shape || this.globalConfig.shape,
      this.size,
      this.variant,
      this.zenClass,
      this.disabled ? 'disabled' : '',
    ].filter((cls) => cls && cls !== 'default');
  }
}
