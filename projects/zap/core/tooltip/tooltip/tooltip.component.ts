import { Component, ContentChild, ElementRef, HostListener, Input, ViewChild } from '@angular/core';

import { ZapTooltipHandler } from '../tooltip-handler/tooltip-handler.component';
import { ZapTooltipContent } from '../tooltip-content/tooltip-content.component';

@Component({
  selector: 'zap-tooltip',
  standalone: true,
  template: `
    <div #tooltip class="zap__tooltip">
      <ng-content select="zap-tooltip-handler"></ng-content>
      <ng-content select="zap-tooltip-content"></ng-content>
    </div>
  `,
  styleUrls: ['./tooltip.component.scss']
})
export class ZapTooltip {
  @Input() shape: 'curve' | 'pill' | 'flat' = 'flat';
  @Input() position: 'top' | 'bottom' | 'left' | 'right' | 'auto' = 'auto';
  @ViewChild('tooltip', { static: true }) tooltip!: ElementRef;
  @ContentChild(ZapTooltipHandler) handler!: ZapTooltipHandler;
  @ContentChild(ZapTooltipContent) content!: ZapTooltipContent;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.content.show();
    this.adjustPosition();
  }

  private adjustPosition() {
    const holderElement = this.tooltip.nativeElement;
    const contentElement = this.content.contentElement.nativeElement;
    const holderRect = holderElement.getBoundingClientRect();
    const contentRect = contentElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - holderRect.bottom;
    const spaceAbove = holderRect.top;

    
    if (this.position === 'auto') {
      if (
        spaceAbove < contentRect.height &&
        spaceBelow > contentRect.height
      ) {
        contentElement.style.top = `${holderRect.height}px`;
        contentElement.style.bottom = 'auto';
      } else {
        contentElement.style.top = 'auto';
        contentElement.style.bottom = `${holderRect.height + 5}px`;
      }
    } else {
      switch (this.position) {
      case 'top':
        contentElement.style.top = 'auto';
        contentElement.style.bottom = `${holderRect.height + 5}px`;
        break;
      case 'bottom':
        contentElement.style.top = `${holderRect.height}px`;
        contentElement.style.bottom = 'auto';
        break;
      case 'left':
        contentElement.style.left = 'auto';
        contentElement.style.right = `${holderRect.width + 5}px`;
        contentElement.style.top = '50%';
        contentElement.style.transform = 'translateY(-50%)';
        break;
      case 'right':
        contentElement.style.left = `${holderRect.width + 5}px`;
        contentElement.style.right = 'auto';
        contentElement.style.top = '50%';
        contentElement.style.transform = 'translateY(-50%)';
        break;
      }
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.content.hide();
  }
}
