import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZapIconDirective } from '../public-api';

@Component({
  selector: 'zap-alert',
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class ZapAlert implements AfterViewInit {
  @ContentChild(ZapIconDirective, { static: false })
  iconDirective!: ZapIconDirective;
  dismiss = output();
  type = input<'success' | 'warning' | 'error' | 'info' | 'default'>('default');
  shape = input<'curve' | 'pill' | 'flat'>();
  variant = input<'default' | 'outlined'>();
  icon = input<string>('');
  zapClass = input<string>('');

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    if (this.iconDirective) {
      this.iconDirective.el.nativeElement.style.height = 'var(--zap-alert-font-size)';
      this.cdr.detectChanges();
    }
  }

  get classes() {
    return [this.shape(), this.variant(), this.type(), this.zapClass()]
      .filter((cls) => cls && cls !== 'default')
      .join(' ');
  }
}
