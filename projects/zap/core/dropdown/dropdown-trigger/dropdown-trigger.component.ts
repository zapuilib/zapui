import { Component, Input } from '@angular/core';

@Component({
  selector: 'zap-dropdown-trigger',
  imports: [],
  template: ` <ng-content />`,
  styleUrl: './dropdown-trigger.component.scss',
  host: {
    '[class]': 'zapClass',
  },
})
export class ZapDropdownTrigger {
  @Input() zapClass = '';
}
