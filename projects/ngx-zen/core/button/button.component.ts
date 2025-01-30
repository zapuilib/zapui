import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ngx-zen-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ZenButtonComponent {
  @Input() text = 'Submit';
  @Input() zenClass: string = '';
  @Input() shape!: 'pill' | 'curve' | 'default';
  @Input() size!: 'compact' | 'wide' | 'tight' | 'default';
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
      this.zenClass,
    ].filter((cls) => cls && cls !== 'default');
  }
}
