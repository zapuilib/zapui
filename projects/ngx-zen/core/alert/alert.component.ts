import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngx-zen-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class ZenAlertComponent implements OnInit {
  @Output() dismiss: EventEmitter<void> = new EventEmitter<void>();
  @Input() type: 'success' | 'warning' | 'error' | 'info' | 'default' =
    'default';
  @Input() variant: 'default' = 'default';
  @Input() shape!: 'curve' | 'pill' | 'default';
  @Input() icon: string = '';
  @Input() zenClass: string = '';

  private globalConfig: { shape: string } = { shape: '' };

  ngOnInit(): void {
    const rootStyles = getComputedStyle(document.documentElement);
    this.globalConfig.shape = rootStyles.getPropertyValue('--zen-shape').trim();
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
      this.shape || this.globalConfig.shape,
      this.variant,
      this.type,
      this.zenClass,
    ]
      .filter((cls) => cls && cls !== 'default')
      .join(' ');
  }
}
