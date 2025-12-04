import { Overlay, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'zap-dropdown-menu-portal',
  imports: [],
  template: ` <div>
    <div
      #subTriggerRef
      class="trigger"
      role="button"
      aria-haspopup="true"
      (mouseenter)="showMenu()"
      (mouseleave)="hideMenu()">
      <ng-content select="zap-dropdown-menu-sub-trigger"></ng-content>
    </div>

    <ng-template #subMenuTemplate>
      <div (mouseenter)="keepMenuOpen()" (mouseleave)="hideMenu()" class="submenu">
        <ng-content select="zap-dropdown-menu-sub"></ng-content>
      </div>
    </ng-template>
  </div>`,
  styleUrl: './dropdown-menu-portal.component.scss',
  host: {
    '[class]': 'zapClass()',
  },
})
export class ZapDropdownMenuPortal implements AfterViewInit {
  @ViewChild('subTriggerRef', { read: ElementRef }) triggerRef!: ElementRef;
  @ViewChild('subMenuTemplate') menuTemplate!: TemplateRef<any>;
  zapClass = input('');

  overlayRef!: OverlayRef;

  constructor(
    private overlay: Overlay,
    private vcr: ViewContainerRef,
    private positionBuilder: OverlayPositionBuilder,
  ) {}

  private timeoutId: any;
  private showTimeoutId: any;

  ngAfterViewInit(): void {
    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo(this.triggerRef)
      .withPositions([
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top',
          offsetX: 8,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'top',
          offsetX: -8,
        },
      ])
      .withFlexibleDimensions(true)
      .withViewportMargin(8)
      .withPush(true);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: false,
    });
  }

  showMenu(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    if (this.showTimeoutId) {
      clearTimeout(this.showTimeoutId);
    }

    this.showTimeoutId = setTimeout(() => {
      if (!this.overlayRef.hasAttached()) {
        const portal = new TemplatePortal(this.menuTemplate, this.vcr);
        this.overlayRef.attach(portal);
      }
    }, 100);
  }

  hideMenu(): void {
    if (this.showTimeoutId) {
      clearTimeout(this.showTimeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.overlayRef.detach();
    }, 150);
  }

  keepMenuOpen(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    if (this.showTimeoutId) {
      clearTimeout(this.showTimeoutId);
    }
  }
}
