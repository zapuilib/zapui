import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZapIconDirective } from '../public-api';

@Component({
  selector: 'zap-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class ZapAlert implements AfterViewInit {
  @Output() dismiss: EventEmitter<void> = new EventEmitter<void>();
  @Input() type: 'success' | 'warning' | 'error' | 'info' | 'default' = 'default';
  @Input() shape!: 'curve' | 'pill' | 'flat';
  @Input() variant!: 'default' | 'outlined';
  @Input() icon = '';
  @Input() zapClass = '';
  @ContentChild(ZapIconDirective, { static: false })
  iconDirective!: ZapIconDirective;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    if (this.iconDirective) {
      this.iconDirective.el.nativeElement.style.height = 'var(--zap-alert-font-size)';
      this.cdr.detectChanges();
    }
  }

  get classes() {
    return [this.shape, this.variant, this.type, this.zapClass]
      .filter((cls) => cls && cls !== 'default')
      .join(' ');
  }
}
