import {
  AfterViewInit,
  Component,
  ContentChild,
  HostListener,
  input,
  OnDestroy,
  OnInit,
  output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { A11yModule } from '@angular/cdk/a11y';

import { ZapDialogFooterDirective } from './dialog-footer.directive';

@Component({
  selector: 'zap-dialog',
  imports: [CommonModule, PortalModule, A11yModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class ZapDialog implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(CdkPortal) portalContent!: CdkPortal;
  @ContentChild(ZapDialogFooterDirective, { static: false })
  footerDirective!: ZapDialogFooterDirective;
  confirm = output();
  close = output();
  title = input('Are you sure?');
  text = input('');
  closeAction = input('No, cancel');
  confirmAction = input('Yes, confirm');
  zapClass = input('');
  shape = input<'curve' | 'pill' | 'flat'>();
  position = input<'top' | 'default'>('default');
  showOverlay = input(false);
  private overlayRef!: OverlayRef;
  @HostListener('document:keydown', ['$event'])
  handleEsc(event: KeyboardEvent): void {
    if (event.key === 'Escape' || event.code === 'Escape') this.close.emit();
  }
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.handleDirectiveStyle();
    this.updatePosition();
  }

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

    if (this.position() === 'top') {
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
    return [this.shape() ?? '', this.position(), this.zapClass()].filter(
      (cls) => cls && cls !== 'default',
    );
  }

  get overlayClasses(): string[] {
    return this.zapClass()
      .split(' ')
      .filter((cls) => cls.startsWith('overlay:'));
  }

  ngOnDestroy(): void {
    this.destroyOverlay();
  }
}
