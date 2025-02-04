import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'zap-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class ZapAlertComponent implements OnInit {
  @Output() dismiss: EventEmitter<void> = new EventEmitter<void>();
  @Input() type: 'success' | 'warning' | 'error' | 'info' | 'default' =
    'default';
  @Input() variant: 'default' = 'default';
  @Input() shape!: 'curve' | 'pill' | 'flat';
  @Input() icon: string = '';
  @Input() zapClass: string = '';

  constructor() {}

  ngOnInit(): void {
    this.assignIcon();
  }
  
  private assignIcon(): void {
    if (this.icon) return;
    switch (this.type) {
      case 'success':
        this.icon = 'fa-circle-check';
        break;
      case 'warning':
        this.icon = 'fa-triangle-exclamation';
        break;
      case 'error':
        this.icon = 'fa-triangle-exclamation';
        break;
      case 'info':
        this.icon = 'fa-circle-info';
        break;
      default:
        break;
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
