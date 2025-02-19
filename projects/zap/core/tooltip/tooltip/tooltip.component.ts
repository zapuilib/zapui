import {
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';

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
  styleUrls: ['./tooltip.component.scss'],
})
export class ZapTooltip implements OnDestroy {
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

  @HostListener('window:resize')
  onWindowResize(): void {
    if(this.content.contentElement.nativeElement.style.visibility === 'visible') {
      this.adjustPosition();
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if(this.content.contentElement.nativeElement.style.visibility === 'visible') {
      this.adjustPosition();
    }
  }


  @HostListener('mouseleave')
  onMouseLeave() {
    this.content.hide();
    this.removeTooltipFromBody();
  }


  private adjustPosition() {
    if(typeof window === 'undefined') return;
    const holderElement = this.tooltip.nativeElement;
    const contentElement = this.content.contentElement.nativeElement;
    const holderRect = holderElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - holderRect.bottom;
    const spaceAbove = holderRect.top;
    
    if (!contentElement.dataset.appendedToBody) {
      document.body.appendChild(contentElement);
      contentElement.dataset.appendedToBody = 'true';
    }

    let contentRect = contentElement.getBoundingClientRect();

    contentElement.style.position = 'fixed';

    let parent = holderElement.closest(
      '.__zap__modal__wrapper, .__zap__dialog, .modal, .dialog, .__zap__form__control__calendar'
    );
    if (parent) {
      contentElement.style.zIndex = '999';
    }

    let parentElement = contentElement.offsetParent as HTMLElement;
    let parentRect = parentElement
      ? parentElement.getBoundingClientRect()
      : { top: 0, left: 0 };
    const offsetLeft = holderRect.left - parentRect.left;
    const offsetTop = holderRect.top - parentRect.top;
    const offsetBottom = holderRect.bottom - parentRect.top;

    if (this.position === 'auto') {
      if (spaceAbove < contentRect.height && spaceBelow > contentRect.height) {
      contentElement.style.top = `${offsetBottom}px`;
      contentElement.style.left = `${offsetLeft + holderRect.width / 2}px`;
      } else {
      contentElement.style.top = `${offsetTop - contentRect.height - 5}px`;
      contentElement.style.left = `${offsetLeft + holderRect.width / 2}px`;
      }
    } else {
      switch (this.position) {
      case 'top':
        contentElement.style.top = `${offsetTop - contentRect.height - 5}px`;
        contentElement.style.left = `${offsetLeft + holderRect.width / 2}px`;
        break;
      case 'bottom':
        contentElement.style.top = `${offsetBottom}px`;
        contentElement.style.left = `${offsetLeft + holderRect.width / 2}px`;
        break;
      case 'left':
        contentElement.style.left = `${
        offsetLeft - contentRect.width - 5 + holderRect.width
        }px`;
        contentElement.style.top = `${
        offsetTop + holderRect.height / 2 - contentRect.height / 2
        }px`;
        break;
      case 'right':
        contentElement.style.left = `${offsetLeft + holderRect.width + 5 + holderRect.width}px`;
        contentElement.style.top = `${
        offsetTop + holderRect.height / 2 - contentRect.height / 2
        }px`;
        break;
      }
    }
  }

  private removeTooltipFromBody(): void {
    const contentElement = this.content.contentElement.nativeElement;
    if (contentElement.dataset.appendedToBody) {
      document.body.removeChild(contentElement);
      delete contentElement.dataset.appendedToBody;
    }
  }

  ngOnDestroy(): void {
    this.removeTooltipFromBody();
  }
}
