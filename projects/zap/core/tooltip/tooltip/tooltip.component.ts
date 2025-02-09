import { Component, ContentChild, ElementRef, HostListener } from '@angular/core';

import { ZapTooltipHandler } from '../tooltip-handler/tooltip-handler.component';
import { ZapTooltipContent } from '../tooltip-content/tooltip-content.component';

@Component({
  selector: 'zap-tooltip',
  standalone: true,
  template: `
    <div class="zap__tooltip">
      <ng-content select="zap-tooltip-handler"></ng-content>
      <ng-content select="zap-tooltip-content"></ng-content>
    </div>
  `,
  styleUrls: ['./tooltip.component.scss']
})
export class ZapTooltip {
  @ContentChild(ZapTooltipHandler) handler!: ZapTooltipHandler;
  @ContentChild(ZapTooltipContent) content!: ZapTooltipContent;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.content.show();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.content.hide();
  }
}
