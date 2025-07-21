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

    const cleanup = this.setupPositionHandling(element, overlayRef, config.position);

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

  private setupPositionHandling(
    element: HTMLElement,
    overlayRef: OverlayRef,
    configPosition?: 'top' | 'top-l' | 'top-r' | 'bottom' | 'bottom-l' | 'bottom-r',
  ): () => void {
    if (typeof window === 'undefined') {
      return () => void 0;
    }

    const getPosition = () => {
      if (window.innerWidth < 640) return 'top';
      return configPosition || 'bottom';
    };

    const updatePosition = () => {
      const position = getPosition();
      let strategy = this.overlay.position().global();
      switch (position) {
        case 'top':
          strategy = strategy.top('20px').centerHorizontally();
          break;
        case 'top-l':
          strategy = strategy.top('20px').left('20px');
          break;
        case 'top-r':
          strategy = strategy.top('20px').right('20px');
          break;
        case 'bottom':
          strategy = strategy.bottom('20px').centerHorizontally();
          break;
        case 'bottom-l':
          strategy = strategy.bottom('20px').left('20px');
          break;
        case 'bottom-r':
          strategy = strategy.bottom('20px').right('20px');
          break;
        default:
          strategy = strategy.bottom('20px').centerHorizontally();
      }
      overlayRef.updatePositionStrategy(strategy);
      Object.assign(element.style, TOAST_STYLES.positions[position]);

      if (element.style.opacity === '0') {
        if (position === 'top') {
          element.style.transform = 'translate(-50%, -100%)';
        } else if (position === 'bottom') {
          element.style.transform = 'translate(-50%, 100%)';
        } else if (position === 'top-l' || position === 'bottom-l') {
          element.style.transform = 'translateX(-100%)';
        } else if (position === 'top-r' || position === 'bottom-r') {
          element.style.transform = 'translateX(100%)';
        }
      } else {
        if (position === 'top' || position === 'bottom') {
          element.style.transform = 'translate(-50%, 0)';
        } else {
          element.style.transform = 'translateX(0)';
        }
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition, { passive: true });

    requestAnimationFrame(() => {
      const position = getPosition();
      if (position === 'top' || position === 'bottom') {
        element.style.transform = 'translate(-50%, 0)';
      } else {
        element.style.transform = 'translateX(0)';
      }
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
    let position = 'bottom';
    try {
      if (
        ref.componentRef.instance &&
        typeof ref.componentRef.instance === 'object' &&
        'position' in ref.componentRef.instance
      ) {
        const posInput = (ref.componentRef.instance as any).position;
        if (typeof posInput === 'function') {
          position = posInput();
        } else if (typeof posInput === 'string') {
          position = posInput;
        }
      }
    } catch {
      position = 'bottom';
    }
    if (position === 'top') {
      element.style.transform = 'translate(-50%, -100%)';
    } else if (position === 'bottom') {
      element.style.transform = 'translate(-50%, 100%)';
    } else if (position === 'top-l' || position === 'bottom-l') {
      element.style.transform = 'translateX(-100%)';
    } else if (position === 'top-r' || position === 'bottom-r') {
      element.style.transform = 'translateX(100%)';
    } else {
      element.style.transform = 'translate(-50%, 100%)';
    }
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
