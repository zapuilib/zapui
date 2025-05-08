import { CommonModule } from '@angular/common';
import { Component, ContentChild, AfterViewInit, input, output } from '@angular/core';
import { ZapIconDirective } from '../public-api';

@Component({
  selector: 'zap-chip',
  imports: [CommonModule],
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ZapChip implements AfterViewInit {
  @ContentChild(ZapIconDirective, { static: false })
  iconDirective!: ZapIconDirective;
  dismiss = output();
  text = input('Chip');
  zapClass = input('');
  variant = input<'outlined' | 'default'>('default');
  shape = input<'pill' | 'curve' | 'flat'>();
  size = input<'base' | 'compact' | 'wide'>('base');
  type = input<'default' | 'info' | 'success' | 'warning' | 'error'>('default');
  icon = input<string | undefined>(undefined);
  iconPosition = input<'left' | 'right'>('left');
  disabled = input(false);
  dismissible = input(false);

  ngAfterViewInit() {
    if (this.iconDirective) {
      this.iconDirective.el.nativeElement.style.height = 'var(--zap-chip-font-size)';
      this.iconDirective.el.nativeElement.style.marginRight =
        this.iconPosition() === 'left' ? '8px' : '0';
      this.iconDirective.el.nativeElement.style.marginLeft =
        this.iconPosition() === 'right' ? '8px' : '0';
      this.iconDirective.el.nativeElement.style.order = this.iconPosition() === 'right' ? '1' : '0';
    }
  }

  onRemove(event: Event) {
    event.stopPropagation();
    if (!this.disabled() && this.dismissible()) {
      this.dismiss.emit();
    }
  }

  get classes(): string[] {
    return [
      this.type(),
      this.shape() ?? '',
      this.size(),
      this.variant(),
      this.zapClass(),
      this.disabled() ? 'disabled' : '',
      this.dismissible() ? 'dismissible' : '',
      this.dismissible() && this.icon() && this.iconPosition() === 'left'
        ? 'dismissible-left'
        : this.dismissible() && this.icon() && this.iconPosition() === 'right'
          ? 'dismissible-right'
          : '',
    ].filter((cls) => cls && cls !== 'default');
  }
}
