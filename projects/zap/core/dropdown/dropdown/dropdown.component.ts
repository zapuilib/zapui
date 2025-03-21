import {
  Component,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { Overlay, OverlayRef, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'zap-dropdown',
  standalone: true,
  imports: [],
  template: `
    <div class="relative">
      <!-- Trigger -->
      <div
        #triggerRef
        (click)="toggleMenu()"
        (keydown.enter)="toggleMenu()"
        (keydown.space)="toggleMenu()"
        tabindex="0"
        role="button"
        aria-haspopup="true"
        [attr.aria-expanded]="overlayRef?.hasAttached()">
        <ng-content select="zap-dropdown-trigger"></ng-content>
      </div>

      <!-- Menu template -->
      <ng-template #menuTemplate>
        <ng-content select="zap-dropdown-menu"></ng-content>
      </ng-template>
    </div>
  `,
  styleUrls: ['./dropdown.component.scss'],
})
export class ZapDropdown implements AfterViewInit {
  @ViewChild('triggerRef', { read: ElementRef }) triggerRef!: ElementRef;
  @ViewChild('menuTemplate') menuTemplate!: TemplateRef<any>;

  overlayRef!: OverlayRef;

  constructor(
    private overlay: Overlay,
    private vcr: ViewContainerRef,
    private positionBuilder: OverlayPositionBuilder,
  ) {}

  ngAfterViewInit(): void {
    const positionStrategy = this.positionBuilder
      .flexibleConnectedTo(this.triggerRef)
      .withPositions([
        {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top',
        },
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
        },
      ])
      .withFlexibleDimensions(false)
      .withPush(false);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.detach();
    });
  }

  toggleMenu() {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    } else {
      const portal = new TemplatePortal(this.menuTemplate, this.vcr);
      this.overlayRef.attach(portal);
    }
  }
}
