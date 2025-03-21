import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'zap-dropdown-menu-item',
  standalone: true,
  imports: [],
  template: ` <ng-content />`,
  styleUrl: './dropdown-menu-item.component.scss',
})
export class ZapDropdownMenuItem {
  @Input() disabled = false;

  @HostBinding('class.disabled')
  @HostBinding('attr.disabled')
  get isDisabled(): boolean {
    return this.disabled;
  }
}
