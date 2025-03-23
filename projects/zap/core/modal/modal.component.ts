import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { A11yModule } from '@angular/cdk/a11y';

@Component({
  selector: 'zap-modal',
  standalone: true,
  imports: [CommonModule, PortalModule, A11yModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ZapModal implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(CdkPortal) portalContent!: CdkPortal;
  @ViewChild('modalContent') modalContent!: ElementRef;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Input() shape!: 'curve' | 'flat' | 'pill';
  @Input() size: 'tight' | 'compact' | 'base' | 'wide' | 'full' = 'tight';
  @Input() zapClass = '';
  @Input() showOverlay = false;
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
    return [this.shape, this.size, this.zapClass].filter((cls) => cls && cls !== 'default');
  }

  getOverlayBackdropClass(): string {
    const overlayClasses = this.overlayClasses;
    return overlayClasses.length > 0 ? overlayClasses.join(' ') : '__zap__overlay';
  }

  get overlayClasses(): string[] {
    return this.zapClass.split(' ').filter((cls) => cls.startsWith('overlay:'));
  }

  ngOnDestroy(): void {
    this.destroyOverlay();
  }
}
