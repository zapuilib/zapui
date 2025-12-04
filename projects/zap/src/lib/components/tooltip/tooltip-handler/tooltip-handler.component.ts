import { Component } from '@angular/core';

@Component({
  selector: 'zap-tooltip-handler',
  standalone: true,
  template: `<ng-content></ng-content>`,
  styleUrls: ['./tooltip-handler.component.scss'],
})
export class ZapTooltipHandler {}
