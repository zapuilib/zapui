import { AfterViewInit, Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZapIconDirective } from '../public-api';

@Component({
  selector: 'zap-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class ZapAlertComponent implements AfterViewInit {
  @Output() dismiss: EventEmitter<void> = new EventEmitter<void>();
  @Input() type: 'success' | 'warning' | 'error' | 'info' | 'default' =
    'default';
  @Input() variant: 'default' = 'default';
  @Input() shape!: 'curve' | 'pill' | 'flat';
  @Input() icon: string = '';
  @Input() zapClass: string = '';
  @ContentChild(ZapIconDirective, { static: false })
  iconDirective!: ZapIconDirective;
  hasZapIcon: boolean = false;

  constructor() {}

  ngAfterViewInit() {
    if (this.iconDirective) {
      this.hasZapIcon = true;
      this.iconDirective.el.nativeElement.style.height = 'var(--zap-alert-font-size)';
    }
  }

  get classes() {
    return [
      this.shape,
      this.variant,
      this.type,
      this.zapClass,
    ]
      .filter((cls) => cls && cls !== 'default')
      .join(' ');
  }
}
