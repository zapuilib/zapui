import { Component, Input } from '@angular/core';

@Component({
  selector: 'zap-dropdown-separator',
  imports: [],
  template: ` <ng-content />`,
  styleUrl: './dropdown-separator.component.scss',
  host: {
    '[class]': 'zapClass',
  },
})
export class ZapDropdownSeparator {
  @Input() zapClass = '';
}
