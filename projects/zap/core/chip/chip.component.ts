import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ContentChild, AfterViewInit } from '@angular/core';
import { ZapIconDirective } from '../public-api';

@Component({
  selector: 'zap-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ZapChip implements AfterViewInit {
  @Output() dismiss = new EventEmitter<void>();
  @Input() text = 'Chip';
  @Input() zapClass = '';
  @Input() variant: 'outlined' | 'default' = 'default';
  @Input() shape!: 'pill' | 'curve' | 'flat';
  @Input() size: 'base' | 'compact' | 'wide' = 'base';
  @Input() type: 'default' | 'info' | 'success' | 'warning' | 'error' = 'default';
  @Input() icon?: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() disabled = false;
  @Input() dismissible = false;
  @ContentChild(ZapIconDirective, { static: false })
  iconDirective!: ZapIconDirective;

  ngAfterViewInit() {
    if (this.iconDirective) {
      this.iconDirective.el.nativeElement.style.height = 'var(--zap-chip-font-size)';
      this.iconDirective.el.nativeElement.style.marginRight =
        this.iconPosition === 'left' ? '8px' : '0';
      this.iconDirective.el.nativeElement.style.marginLeft =
        this.iconPosition === 'right' ? '8px' : '0';
      this.iconDirective.el.nativeElement.style.order = this.iconPosition === 'right' ? '1' : '0';
    }
  }

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
      this.dismissible ? 'dismissible' : '',
      this.dismissible && this.icon && this.iconPosition === 'left'
        ? 'dismissible-left'
        : this.dismissible && this.icon && this.iconPosition === 'right'
          ? 'dismissible-right'
          : '',
    ].filter((cls) => cls && cls !== 'default');
  }
}
