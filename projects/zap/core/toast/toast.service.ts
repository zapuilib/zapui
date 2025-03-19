import {
  Injectable,
  ComponentRef,
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  signal,
  DestroyRef,
  inject,
} from '@angular/core';

import { ZapToast } from './toast.component';
import { ZapToastInterface } from './toast.interface';
import { TOAST_STYLES, TOAST_DURATION } from './toast.constant';

type ToastPosition = 'top' | 'bottom';

@Injectable({ providedIn: 'root' })
export class ZapToastService {
  private activeToastRef = signal<ComponentRef<ZapToast> | null>(null);
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector,
  ) {}

  private createToast(config: ZapToastInterface) {
    if (this.activeToastRef()) {
      this.dismissImmediately(this.activeToastRef()!);
    }

    const toastComponentRef = createComponent(ZapToast, {
      environmentInjector: this.injector,
    });

    Object.assign(toastComponentRef.instance, config);
    toastComponentRef.changeDetectorRef.detectChanges();

    const element = toastComponentRef.location.nativeElement;
    document.body.appendChild(element);
    this.appRef.attachView(toastComponentRef.hostView);

    this.applyStyles(element);
    const cleanup = this.setupPositionHandling(element);

    this.destroyRef.onDestroy(() => {
      cleanup();
      this.dismissImmediately(toastComponentRef);
    });

    toastComponentRef.instance.dismiss.subscribe(() => {
      cleanup();
      this.hide(toastComponentRef);
    });

    this.activeToastRef.set(toastComponentRef);

    setTimeout(() => {
      if (this.activeToastRef() === toastComponentRef) {
        cleanup();
        this.hide(toastComponentRef);
      }
    }, config.duration || TOAST_DURATION);
  }

  private applyStyles(element: HTMLElement): void {
    Object.assign(element.style, TOAST_STYLES.base, {
      opacity: '0',
      transform: 'translateY(-100%)',
    });
  }

  private setupPositionHandling(element: HTMLElement): () => void {
    if (typeof window === 'undefined')
      return () => {
        return;
      };

    const updatePosition = () => {
      const position: ToastPosition = window.innerWidth < 640 ? 'top' : 'bottom';
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

  private dismissImmediately(toastRef: ComponentRef<ZapToast>) {
    if (!toastRef || !toastRef.location) return;
    const element = toastRef.location.nativeElement;
    element.parentNode?.removeChild(element);
    toastRef.destroy();
    this.activeToastRef.set(null);
  }

  private hide(toastRef: ComponentRef<ZapToast>) {
    if (!toastRef || !toastRef.location) return;

    const element = toastRef.location.nativeElement;
    element.style.transform = 'translateX(100%)';
    element.style.opacity = '0';

    setTimeout(() => {
      if (this.activeToastRef() === toastRef) {
        element.parentNode?.removeChild(element);
        toastRef.destroy();
        this.activeToastRef.set(null);
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
