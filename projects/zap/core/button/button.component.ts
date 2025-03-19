import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ContentChild, Input } from '@angular/core';

import { ZapIconDirective } from '../directives/icon.directive';

@Component({
  selector: 'zap-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ZapButton implements AfterViewInit {
  @Input() text = 'Submit';
  @Input() zapClass = '';
  @Input() shape!: 'pill' | 'curve' | 'flat';
  @Input() size!: 'compact' | 'wide' | 'tight' | 'base';
  @Input() type: 'info' | 'success' | 'warning' | 'error' | 'default' = 'default';
  @Input() icon!: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() img: string | undefined = undefined;
  @Input() imgPosition: 'left' | 'right' = 'left';
  @Input() variant: 'outlined' | 'default' | 'link' = 'default';
  @Input() disabled = false;
  @Input() icononly = false;
  @ContentChild(ZapIconDirective, { static: false })
  iconDirective!: ZapIconDirective;

  ngAfterViewInit() {
    if (this.iconDirective) {
      this.iconDirective.el.nativeElement.style.height = 'var(--zap-button-font-size)';
      this.iconDirective.el.nativeElement.style.fontSize = 'var(--zap-button-font-size)';
      this.iconDirective.el.nativeElement.style.fill = 'var(--zap-button-text-color)';
      this.iconDirective.el.nativeElement.style.marginRight =
        this.iconPosition === 'left' && !this.icononly ? '8px' : '0';
      this.iconDirective.el.nativeElement.style.marginLeft =
        this.iconPosition === 'right' && !this.icononly ? '8px' : '0';
      this.iconDirective.el.nativeElement.style.order = this.iconPosition === 'right' ? '1' : '0';
    }
  }

  get classes(): string[] {
    return [
      this.icononly ? 'icononly' : '',
      this.type,
      this.shape,
      this.size,
      this.variant,
      this.zapClass,
    ].filter((cls) => cls && cls !== 'default');
  }
}
