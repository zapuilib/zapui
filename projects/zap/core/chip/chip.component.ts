import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'zap-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ZapChipComponent {
  @Output() dismiss = new EventEmitter<void>();
  @Input() text = 'Chip';
  @Input() zapClass: string = '';
  @Input() variant: 'outlined' | 'default' = 'default';
  @Input() shape!: 'pill' | 'curve' | 'flat';
  @Input() size: 'base' | 'compact' | 'wide' = 'base';
  @Input() type: 'default' | 'info' | 'success' | 'warning' | 'error' =
    'default';
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() disabled = false;
  @Input() dismissible = false;

  //TODO: Support custom icon (not a font) via iconTemplate

  onRemove(event: Event) {
    event.stopPropagation();
    if (!this.disabled && this.dismissible) {
      this.dismiss.emit();
    }
  }

  get classes(): string[] {
    return [
      this.type,
      this.shape,
      this.size,
      this.variant,
      this.zapClass,
      this.disabled ? 'disabled' : '',
      this.dismissible && this.icon && this.iconPosition === 'left'
        ? 'dismissible-left'
        : this.dismissible && this.icon && this.iconPosition === 'right'
        ? 'dismissible-right'
        : '',
    ].filter((cls) => cls && cls !== 'default');
  }
}
