import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-zen-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ZenButtonComponent implements OnInit {
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

  private globalConfig: { shape: string; btnSize: string } = {
    shape: '',
    btnSize: '',
  };

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const rootStyles = getComputedStyle(document.documentElement);
      this.globalConfig.shape = rootStyles
        .getPropertyValue('--zen-shape')
        .trim();
      this.globalConfig.btnSize = rootStyles
        .getPropertyValue('--zen-btn-size')
        .trim();
    }
  }

  get classes(): string[] {
    return [
      this.type,
      this.shape || this.globalConfig.shape,
      this.size || this.globalConfig.btnSize,
      this.variant,
      this.zenClass,
    ].filter((cls) => cls && cls !== 'default');
  }
}
