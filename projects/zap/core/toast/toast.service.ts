import {
  Injectable,
  ComponentRef,
  EnvironmentInjector,
  signal,
  DestroyRef,
  inject,
} from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { ZapToast } from './toast.component';
import { ZapToastInterface } from './toast.interface';
import { TOAST_STYLES, TOAST_DURATION } from './toast.constant';

type ToastPosition = 'top' | 'bottom';

@Injectable({ providedIn: 'root' })
export class ZapToastService {
  private activeToastRef = signal<{
    overlayRef: OverlayRef;
    componentRef: ComponentRef<ZapToast>;
  } | null>(null);
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private overlay: Overlay,
    private injector: EnvironmentInjector,
  ) {}

  private createToast(config: ZapToastInterface) {
    if (this.activeToastRef()) {
      this.dismissImmediately(this.activeToastRef()!);
    }

    const overlayRef = this.createOverlay();
    const toastPortal = new ComponentPortal(ZapToast, null, this.injector);
    const componentRef = overlayRef.attach(toastPortal);

    for (const [key, value] of Object.entries(config)) {
      if (key === 'actioned') {
        componentRef.setInput?.('actionedFn', config.actioned);
      } else {
        componentRef.setInput?.(key as any, value);
      }
    }

    componentRef.changeDetectorRef.detectChanges();

    const element = componentRef.location.nativeElement;
    this.applyStyles(element);
    const cleanup = this.setupPositionHandling(element, overlayRef);

    this.destroyRef.onDestroy(() => {
      cleanup();
      this.dismissImmediately({ overlayRef, componentRef });
    });

    componentRef.instance.dismiss.subscribe(() => {
      cleanup();
      this.hide({ overlayRef, componentRef });
    });

    this.activeToastRef.set({ overlayRef, componentRef });

    setTimeout(() => {
      if (this.activeToastRef()?.componentRef === componentRef) {
        cleanup();
        this.hide({ overlayRef, componentRef });
      }
    }, config.duration || TOAST_DURATION);
  }

  private createOverlay(): OverlayRef {
    const overlayConfig = new OverlayConfig({
      width: '100%',
      maxWidth: '600px',
      hasBackdrop: false,
      panelClass: 'zap-toast-overlay',
    });

    return this.overlay.create(overlayConfig);
  }

  private applyStyles(element: HTMLElement): void {
    Object.assign(element.style, TOAST_STYLES.base, {
      opacity: '0',
      transform: 'translateY(-100%)',
    });
  }

  private setupPositionHandling(element: HTMLElement, overlayRef: OverlayRef): () => void {
    if (typeof window === 'undefined') {
      return () => void 0;
    }

    const updatePosition = () => {
      const position: ToastPosition = window.innerWidth < 640 ? 'top' : 'bottom';

      const positionStrategy = this.overlay
        .position()
        .global()
        .top(position === 'top' ? '16px' : 'auto')
        .bottom(position === 'bottom' ? '16px' : 'auto')
        .centerHorizontally();

      overlayRef.updatePositionStrategy(positionStrategy);
      Object.assign(element.style, TOAST_STYLES.positions[position]);

      element.style.transform =
        element.style.opacity === '0'
          ? `translateY(${position === 'top' ? '-100%' : '100%'})`
          : 'translateY(0)';
    };

    updatePosition();
    window.addEventListener('resize', updatePosition, { passive: true });

    requestAnimationFrame(() => {
      element.style.transform = 'translateY(0)';
      element.style.opacity = '1';
    });

    return () => window.removeEventListener('resize', updatePosition);
  }

  private dismissImmediately(ref: {
    overlayRef: OverlayRef;
    componentRef: ComponentRef<ZapToast>;
  }) {
    ref.overlayRef.dispose();
    this.activeToastRef.set(null);
  }

  private hide(ref: { overlayRef: OverlayRef; componentRef: ComponentRef<ZapToast> }) {
    const element = ref.componentRef.location.nativeElement;
    element.style.transform = 'translateX(100%)';
    element.style.opacity = '0';

    setTimeout(() => {
      if (this.activeToastRef()?.componentRef === ref.componentRef) {
        this.dismissImmediately(ref);
      }
    }, 300);
  }

  dismiss() {
    if (this.activeToastRef()) {
      this.hide(this.activeToastRef()!);
    }
  }

  show(config: ZapToastInterface) {
    try {
      this.createToast(config);
    } catch (error) {
      console.error('Failed to show toast:', error);
    }
  }
}
