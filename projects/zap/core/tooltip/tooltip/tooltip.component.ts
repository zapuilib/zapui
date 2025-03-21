import { Component, Input } from '@angular/core';

@Component({
  selector: 'zap-tooltip',
  standalone: true,
  template: `
    <div #tooltip class="zap__tooltip">
      <ng-content select="zap-tooltip-handler"></ng-content>
      <ng-content select="zap-tooltip-content"></ng-content>
    </div>
  `,
  styleUrls: ['./tooltip.component.scss'],
})
export class ZapTooltip {
  @Input() shape: 'curve' | 'pill' | 'flat' = 'flat';
  @Input() position: 'top' | 'bottom' | 'left' | 'right' | 'auto' = 'auto';
}
