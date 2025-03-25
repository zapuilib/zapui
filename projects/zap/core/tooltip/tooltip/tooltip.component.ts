import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

import { positionConfigs } from './position.constant';

@Component({
  selector: 'zap-tooltip',
  standalone: true,
  template: `
    <div class="zap__tooltip">
      <div #triggerRef (mouseenter)="showContent()" (mouseleave)="hideContent()">
        <ng-content select="zap-tooltip-handler"></ng-content>
      </div>
      <ng-template #contentTemplate>
        <ng-content select="zap-tooltip-content"></ng-content>
      </ng-template>
    </div>
  `,
  styleUrls: ['./tooltip.component.scss'],
})
export class ZapTooltip implements AfterViewInit, OnDestroy {
  @ViewChild('triggerRef', { read: ElementRef }) triggerRef!: ElementRef;
  @ViewChild('contentTemplate') contentTemplate!: TemplateRef<any>;
  @Input() position: 'top' | 'bottom' | 'left' | 'right' | 'auto' = 'auto';

  overlayRef!: OverlayRef;

  constructor(
    private overlay: Overlay,
    private vcr: ViewContainerRef,
    private positionBuilder: OverlayPositionBuilder,
  ) {}

  ngAfterViewInit(): void {
    const positions = positionConfigs[this.position];

    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo(this.triggerRef)
      .withPositions(positions as any[])
      .withFlexibleDimensions(false)
      .withPush(false);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      panelClass: ['zap-tooltip-panel'],
      hasBackdrop: false,
    });
  }

  private hideTimeout: any;

  showContent() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }

    if (!this.overlayRef.hasAttached()) {
      const portal = new TemplatePortal(this.contentTemplate, this.vcr);
      this.overlayRef.attach(portal);

      this.overlayRef.overlayElement.addEventListener('mouseenter', () => {
        if (this.hideTimeout) {
          clearTimeout(this.hideTimeout);
          this.hideTimeout = null;
        }
      });

      this.overlayRef.overlayElement.addEventListener('mouseleave', () => this.hideContent());
    }
  }

  hideContent() {
    if (this.overlayRef.hasAttached()) {
      this.hideTimeout = setTimeout(() => {
        this.overlayRef.detach();
      }, 200);
    }
  }

  ngOnDestroy() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }
}
