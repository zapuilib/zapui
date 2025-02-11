import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'zap-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class ZapAlertComponent {
  @Output() dismiss: EventEmitter<void> = new EventEmitter<void>();
  @Input() type: 'success' | 'warning' | 'error' | 'info' | 'default' =
    'default';
  @Input() variant: 'default' = 'default';
  @Input() shape!: 'curve' | 'pill' | 'flat';
  @Input() icon: string = '';
  @Input() zapClass: string = '';

  //TODO: Support custom icon (not a font) via iconTemplate

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
