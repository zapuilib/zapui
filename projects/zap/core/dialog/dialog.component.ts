import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZapDialogFooterDirective } from './dialog-footer.directive';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'zap-dialog',
  standalone: true,
  imports: [CommonModule, PortalModule, A11yModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class ZapDialog implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(CdkPortal) portalContent!: CdkPortal;
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Input() title = 'Are you sure?';
  @Input() text = '';
  @Input() closeAction = 'No, cancel';
  @Input() confirmAction = 'Yes, confirm';
  @Input() zapClass = '';
  @Input() shape!: 'curve' | 'pill' | 'flat';
  @Input() position: 'top' | 'default' = 'top';
  @Input() showOverlay = false;
  @HostListener('document:keydown', ['$event'])
  handleEsc(event: KeyboardEvent): void {
    if (event.key === 'Escape' || event.code === 'Escape') this.close.emit();
  }
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.handleDirectiveStyle();
    this.updatePosition();
  }
  @ContentChild(ZapDialogFooterDirective, { static: false })
  footerDirective!: ZapDialogFooterDirective;
  private overlayRef!: OverlayRef;

  constructor(private overlay: Overlay) {}

  ngOnInit(): void {
    this.createOverlay();
  }

  ngAfterViewInit(): void {
    this.attachPortal();
    this.handleDirectiveStyle();
  }

  private handleDirectiveStyle(): void {
    if (this.footerDirective && typeof window !== 'undefined') {
      const windowWidth = window.innerWidth;
      if (windowWidth > 640) {
        this.footerDirective.el.nativeElement.style.display = 'flex';
        this.footerDirective.el.nativeElement.style.justifyContent = 'flex-end';
        this.footerDirective.el.nativeElement.style.gap = '1rem';
        this.footerDirective.el.nativeElement.style.marginTop = 'auto';
      } else {
        this.footerDirective.el.nativeElement.style.display = 'grid';
        this.footerDirective.el.nativeElement.style.gridTemplateColumns = '1fr';
        this.footerDirective.el.nativeElement.style.gap = '1rem';
        this.footerDirective.el.nativeElement.style.marginTop = '3rem';
      }
    }
  }

  private getPosition(): any {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;
    const positionStrategy = this.overlay.position().global();

    if (this.position === 'top') {
      positionStrategy.top('20px').centerHorizontally();
    } else if (isMobile) {
      positionStrategy.bottom('16px').centerHorizontally();
    } else {
      positionStrategy.centerHorizontally().centerVertically();
    }
    return positionStrategy;
  }

  private updatePosition(): void {
    if (!this.overlayRef) return;
    const positionStrategy = this.getPosition();
    this.overlayRef.updatePositionStrategy(positionStrategy);
  }

  private createOverlay(): void {
    const positionStrategy = this.getPosition();
    this.overlayRef = this.overlay.create({
      hasBackdrop: false,
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      panelClass: 'zap-dialog-panel',
      disposeOnNavigation: true,
    });
  }

  private attachPortal(): void {
    if (this.overlayRef && this.portalContent) {
      this.overlayRef.attach(this.portalContent);
    }
  }

  private destroyOverlay(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }

  handleClose(): void {
    this.close.emit();
    this.destroyOverlay();
  }

  get classes(): string[] {
    return [this.shape, this.position, this.zapClass].filter((cls) => cls && cls !== 'default');
  }

  get overlayClasses(): string[] {
    return this.zapClass.split(' ').filter((cls) => cls.startsWith('overlay:'));
  }

  ngOnDestroy(): void {
    this.destroyOverlay();
  }
}
