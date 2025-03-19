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
      @if (isHoveringTooltip || isHoveringContent) {
        <ng-content select="zap-tooltip-content"></ng-content>
      }
    </div>
  `,
  styleUrls: ['./tooltip.component.scss'],
})
export class ZapTooltip implements OnDestroy {
  @ContentChild(ZapTooltipHandler) handler!: ZapTooltipHandler;
  @ContentChild(ZapTooltipContent) content!: ZapTooltipContent;
  @ViewChild('tooltip', { static: true }) tooltip!: ElementRef;
  @Input() shape: 'curve' | 'pill' | 'flat' = 'flat';
  @Input() position: 'top' | 'bottom' | 'left' | 'right' | 'auto' = 'auto';
  private onDocumentMouseMoveBound: (event: MouseEvent) => void;
  isHoveringTooltip = false;
  isHoveringContent = false;

  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.content.contentElement.nativeElement.style.visibility === 'visible') {
      this.adjustPosition();
    }
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (this.content.contentElement.nativeElement.style.visibility === 'visible') {
      this.adjustPosition();
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHoveringTooltip = true;
    this.content.show();
    this.adjustPosition();
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    this.isHoveringTooltip = false;
    this.checkHoverState(event);
  }

  constructor() {
    this.onDocumentMouseMoveBound = this.onDocumentMouseMove.bind(this);
  }

  private checkHoverState(event: MouseEvent) {
    if (typeof window === 'undefined' || !event) return;

    const contentElement = this.content.contentElement.nativeElement;
    const rect = contentElement.getBoundingClientRect();
    const isHoveringNearContent =
      event.clientX >= rect.left - 20 &&
      event.clientX <= rect.right + 10 &&
      event.clientY >= rect.top - 5 &&
      event.clientY <= rect.bottom + 5;

    this.isHoveringContent = isHoveringNearContent;

    if (!this.isHoveringTooltip && !this.isHoveringContent) {
      this.content.hide();
      this.removeTooltipFromBody();
      document.removeEventListener('mousemove', this.onDocumentMouseMoveBound);
    } else {
      document.addEventListener('mousemove', this.onDocumentMouseMoveBound);
    }
  }

  private onDocumentMouseMove(event: MouseEvent) {
    this.checkHoverState(event);
  }

  private adjustPosition() {
    if (typeof window === 'undefined') return;
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

    const contentRect = contentElement.getBoundingClientRect();

    contentElement.style.position = 'fixed';

    const parent = holderElement.closest(
      '.__zap__modal__wrapper, .__zap__dialog, .modal, .dialog, .__zap__form__control__calendar',
    );
    if (parent) {
      contentElement.style.zIndex = '999';
    }

    const contentHeight = contentElement.scrollHeight;

    if (this.position === 'auto') {
      if (spaceAbove < contentHeight && spaceBelow > contentHeight) {
        contentElement.style.top = `${holderRect.top + holderRect.height + 5}px`;
        contentElement.style.left = `${holderRect.left + holderRect.width / 2}px`;
      } else {
        contentElement.style.top = `${holderRect.top - contentHeight - 5}px`;
        contentElement.style.left = `${holderRect.left + holderRect.width / 2}px`;
      }
    } else {
      switch (this.position) {
        case 'top':
          contentElement.style.top = `${holderRect.top - contentHeight - 5}px`;
          contentElement.style.left = `${holderRect.left + holderRect.width / 2}px`;
          break;
        case 'bottom':
          contentElement.style.top = `${holderRect.top + holderRect.height + 5}px`;
          contentElement.style.left = `${holderRect.left + holderRect.width / 2}px`;
          break;
        case 'left':
          contentElement.style.left = `${holderRect.left - contentRect.width / 2 - 15}px`;
          contentElement.style.top = `${holderRect.top + holderRect.height / 2 - contentRect.height / 2}px`;
          break;
        case 'right':
          contentElement.style.left = `${holderRect.left + holderRect.width + contentRect.width / 2 + 15}px`;
          contentElement.style.top = `${holderRect.top + holderRect.height / 2 - contentRect.height / 2}px`;
          break;
      }
    }
  }

  private removeTooltipFromBody(): void {
    if (typeof window === 'undefined') return;
    const contentElement = this.content.contentElement.nativeElement;
    if (contentElement.dataset.appendedToBody) {
      document.body.removeChild(contentElement);
      delete contentElement.dataset.appendedToBody;
    }
  }

  ngOnDestroy(): void {
    this.removeTooltipFromBody();
    if (typeof window !== 'undefined') {
      document.removeEventListener('mousemove', this.onDocumentMouseMoveBound);
    }
  }
}
