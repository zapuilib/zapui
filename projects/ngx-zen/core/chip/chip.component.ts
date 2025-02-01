import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-zen-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ZenChipComponent {
  @Output() dissmiss = new EventEmitter<void>();
  @Input() text = 'Chip';
  @Input() zenClass: string = '';
  @Input() variant: 'outlined' | 'default' = 'default';
  @Input() shape!: 'pill' | 'curve' | 'flat';
  @Input() size: 'base' | 'small' | 'wide' = 'base';
  @Input() type: 'default' | 'info' | 'success' | 'warning' | 'error' =
    'default';
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() disabled = false;
  @Input() dismissible = false;

  onRemove(event: Event) {
    event.stopPropagation();
    if (!this.disabled && this.dismissible) {
      this.dissmiss.emit();
    }
  }

  get classes(): string[] {
    return [
      this.type,
      this.shape,
      this.size,
      this.variant,
      this.zenClass,
      this.disabled ? 'disabled' : '',
    ].filter((cls) => cls && cls !== 'default');
  }
}
