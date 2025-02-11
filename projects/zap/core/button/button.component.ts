import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ContentChild, Input, ChangeDetectorRef } from '@angular/core';
import { ZapButtonIconDirective } from './button-icon.directive';

@Component({
  selector: 'zap-button',
  standalone: true,
  imports: [CommonModule, ZapButtonIconDirective],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ZapButtonComponent implements AfterViewInit {
  @Input() text = 'Submit';
  @Input() zapClass: string = '';
  @Input() shape!: 'pill' | 'curve' | 'flat';
  @Input() size!: 'compact' | 'wide' | 'tight' | 'base';
  @Input() type: 'info' | 'success' | 'warning' | 'error' | 'default' = 'default';
  @Input() icon!: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() img: string | undefined = undefined;
  @Input() imgPosition: 'left' | 'right' = 'left';
  @Input() variant: 'outlined' | 'default' | 'link' = 'default';
  @Input() disabled: boolean = false;
  @Input() icononly: boolean = false;

  @ContentChild(ZapButtonIconDirective, { static: false })
  iconDirective?: ZapButtonIconDirective;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.cdr.detectChanges();
    console.log('iconDirective:', this.iconDirective);
    if (this.iconDirective) {
      const iconElement = this.iconDirective.el.nativeElement;
      iconElement.classList.add('__zap__button__icon');
    }
  }

  get classes(): string[] {
    return [
      this.icononly ? 'icononly' : '',
      this.type,
      this.shape,
      this.size,
      this.variant,
      this.zapClass,
    ].filter((cls) => cls && cls !== 'default');
  }
}