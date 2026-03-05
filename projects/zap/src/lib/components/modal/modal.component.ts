import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  HostListener,
  output,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'zap-modal',
  imports: [CommonModule, PortalModule, A11yModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ZapModal implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(CdkPortal) portalContent!: CdkPortal;
  @ViewChild('modalContent') modalContent!: ElementRef;
  // eslint-disable-next-line @angular-eslint/no-output-native
  close = output();
  shape = input<'curve' | 'flat' | 'pill'>();
  size = input<'tight' | 'compact' | 'base' | 'wide' | 'full'>('tight');
  zapClass = input<string>('');
  showOverlay = input<boolean>(false);
  @HostListener('document:keydown', ['$event'])
  handleEsc(event: KeyboardEvent): void {
    if (event.key === 'Escape' || event.code === 'Escape') {
      this.handleClose();
    }
  }
  private overlayRef!: OverlayRef;

  constructor(private overlay: Overlay) {}

  ngOnInit(): void {
    this.createOverlay();
  }

  ngAfterViewInit(): void {
    this.attachPortal();
  }

  private createOverlay(): void {
    this.overlayRef = this.overlay.create({
      hasBackdrop: false,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
      panelClass: 'zap-modal-panel',
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
    return [this.shape() ?? '', this.size(), this.zapClass()].filter(
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
