import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-zen-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Output() dismiss: EventEmitter<void> = new EventEmitter<void>();
  @Input() type: 'success' | 'warning' | 'error' | 'info' | 'default' = 'default';
  @Input() variant: 'classic' | 'default' = 'default';
  @Input() shape: 'curve' | 'default' = 'default';
  @Input() positionX: 'left' | 'right' = 'right';
  @Input() positionY: 'top' | 'bottom' = 'top';
  @Input() icon: string = '';
  @Input() dismissible: boolean = true;
  @Input() zenClass: string = '';

  constructor() {}

  ngOnInit(): void {
    this.assignIcon();
  }

  private assignIcon(): void {
    if(this.icon) return;
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
}
