import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ContentChild, Input } from '@angular/core';

import { ZapButtonIconDirective } from './button-icon.directive';

@Component({
  selector: 'zap-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ZapButtonComponent implements AfterViewInit {
  @Input() text = 'Submit';
  @Input() zapClass: string = '';
  @Input() shape!: 'pill' | 'curve' | 'flat';
  @Input() size!: 'compact' | 'wide' | 'tight' | 'base';
  @Input() type: 'info' | 'success' | 'warning' | 'error' | 'default' =
    'default';
  @Input() icon!: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() img: string | undefined = undefined;
  @Input() imgPosition: 'left' | 'right' = 'left';
  @Input() variant: 'outlined' | 'default' | 'link' = 'default';
  @Input() disabled: boolean = false;
  @Input() icononly: boolean = false;
  @ContentChild(ZapButtonIconDirective, { static: false })
  iconDirective!: ZapButtonIconDirective;

  constructor() {}

  ngAfterViewInit() {
    if (this.iconDirective) {
      this.iconDirective.el.nativeElement.style.order = this.iconPosition === 'left' ? '1' : '2';
      this.iconDirective.el.nativeElement.style.height = this.size === 'tight' ? '14px' : '16px';
      this.iconDirective.el.nativeElement.style.marginRight = this.iconPosition === 'left' ? '8px' : '0';
      this.iconDirective.el.nativeElement.style.marginLeft = this.iconPosition === 'right' ? '8px' : '0';
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
