import { Component, Input } from '@angular/core';

type BaseType = 'pill' | 'curve' | 'default';
type ModifierType = 'compact' | 'wide' | 'tight';

@Component({
  selector: 'ngx-zen-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() text = 'Submit';
  @Input() theme: 'light' | 'dark' = 'light';
  @Input() zenClass: string = '';
  @Input() shape: 'pill' | 'curve' | 'default' = 'default';
  @Input() size: 'compact' | 'wide' | 'tight' | 'default' = 'default';
  @Input() type: 'icononly' | 'default' = 'default';
  @Input() icon!: string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() variant: 'outlined' | 'default' | 'text' | 'link' = 'default';
  @Input() disabled: boolean = false;
}
