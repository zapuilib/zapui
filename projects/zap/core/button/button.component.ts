import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'zap-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ZapButtonComponent {
  @Input() text = 'Submit';
  @Input() zapClass: string = '';
  @Input() shape!: 'pill' | 'curve' | 'flat';
  @Input() size!: 'compact' | 'wide' | 'tight' | 'base';
  @Input() type: 'icononly' | 'default' = 'default';
  @Input() icon!: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() img: string | undefined = undefined;
  @Input() imgPosition: 'left' | 'right' = 'left';
  @Input() variant: 'outlined' | 'default' | 'link' = 'default';
  @Input() disabled: boolean = false;

  get classes(): string[] {
    return [
      this.type,
      this.shape,
      this.size,
      this.variant,
      this.zapClass,
    ].filter((cls) => cls && cls !== 'default');
  }
}
