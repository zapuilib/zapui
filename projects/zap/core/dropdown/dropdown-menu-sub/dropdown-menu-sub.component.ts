import { Component } from '@angular/core';

@Component({
  selector: 'zap-dropdown-menu-sub',
  standalone: true,
  imports: [],
  template: ` <ng-content />`,
  styleUrl: './dropdown-menu-sub.component.scss',
})
export class ZapDropdownMenuSub {}
