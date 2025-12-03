import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ContentChild, HostListener, input } from '@angular/core';

import { ZapIconDirective } from '../../directives/icon.directive';

@Component({
  selector: 'zap-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ZapButton implements AfterViewInit {
  @ContentChild(ZapIconDirective, { static: false })
  iconDirective!: ZapIconDirective;
  text = input<string>('Submit');
  zapClass = input<string>('');
  shape = input<'pill' | 'curve' | 'flat'>();
  size = input<'compact' | 'wide' | 'tight' | 'base'>();
  type = input<'info' | 'success' | 'warning' | 'error' | 'default'>('default');
  icon = input<string>('');
  iconPosition = input<'left' | 'right'>('left');
  img = input<string | undefined>(undefined);
  imgPosition = input<'left' | 'right'>('left');
  variant = input<'outlined' | 'default' | 'link'>('default');
  disabled = input<boolean>(false);
  icononly = input<boolean>(false);

  @HostListener('click', ['$event'])
  onHostClick(event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }
  }

  ngAfterViewInit() {
    if (this.iconDirective) {
      this.iconDirective.el.nativeElement.style.height = 'var(--zap-button-font-size)';
      this.iconDirective.el.nativeElement.style.fontSize = 'var(--zap-button-font-size)';
      this.iconDirective.el.nativeElement.style.fill = 'var(--zap-button-text-color)';
      this.iconDirective.el.nativeElement.style.marginRight =
        this.iconPosition() === 'left' && !this.icononly ? '8px' : '0';
      this.iconDirective.el.nativeElement.style.marginLeft =
        this.iconPosition() === 'right' && !this.icononly ? '8px' : '0';
      this.iconDirective.el.nativeElement.style.order = this.iconPosition() === 'right' ? '1' : '0';
    }
  }

  get classes(): string[] {
    return [
      this.icononly() ? 'icononly' : '',
      this.type(),
      this.shape() ?? '',
      this.size() ?? '',
      this.variant(),
      this.zapClass(),
    ].filter((cls) => cls && cls !== 'default');
  }
}
