import {
  Component,
  ViewChild,
  TemplateRef,
  ViewContainerRef,
  ElementRef,
  AfterViewInit,
  Input,
} from '@angular/core';
import { Overlay, OverlayRef, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';

import { SHAPE_TOKEN } from '../shape.token';

@Component({
  selector: 'zap-dropdown',
  standalone: true,
  imports: [A11yModule],
  template: `
    <div>
      <div
        #triggerRef
        class="trigger"
        role="button"
        tabindex="-1"
        aria-haspopup="true"
        [attr.aria-expanded]="overlayRef?.hasAttached()"
        (keydown.arrowdown)="$event.preventDefault(); toggleMenu()"
        (keydown.arrowup)="$event.preventDefault(); toggleMenu()"
        (click)="$event.target !== $event.currentTarget && toggleMenu()">
        <ng-content select="zap-dropdown-trigger"></ng-content>
      </div>

      <ng-template #menuTemplate>
        <ng-content select="zap-dropdown-menu"></ng-content>
      </ng-template>
    </div>
  `,
  styleUrls: ['./dropdown.component.scss'],
  host: {
    '[class]': 'zapClass',
  },
  providers: [
    {
      provide: SHAPE_TOKEN,
      useFactory: (component: ZapDropdown) => component.shape,
      deps: [ZapDropdown],
    },
  ],
})
export class ZapDropdown implements AfterViewInit {
  @ViewChild('triggerRef', { read: ElementRef }) triggerRef!: ElementRef;
  @ViewChild('menuTemplate') menuTemplate!: TemplateRef<any>;
  @Input() shape!: 'pill' | 'curve' | 'flat';
  @Input() zapClass = '';
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
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
          offsetY: 8,
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
          offsetY: -8,
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
