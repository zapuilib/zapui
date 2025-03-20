import { Component } from '@angular/core';

@Component({
  selector: 'zap-dropdown-trigger',
  standalone: true,
  imports: [],
  template: ` <ng-content />`,
  styleUrl: './dropdown-trigger.component.scss',
})
export class ZapDropdownTrigger {}
