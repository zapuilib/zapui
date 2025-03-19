import {
  Directive,
  ElementRef,
  HostListener,
  AfterViewInit,
  Renderer2,
  OnDestroy,
} from '@angular/core';

@Directive({
  selector: '[zapScrollArea]',
  standalone: true,
})
export class ZapScrollAreaDirective implements AfterViewInit, OnDestroy {
  private scrollbarTrack: HTMLElement;
  private scrollbarThumb: HTMLElement;
  private thumbHeight = 20;
  private thumbPosition = 0;
  private resizeObserver: ResizeObserver;
  private isScrolling = false;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.renderer.setStyle(this.el.nativeElement, 'scrollbar-width', 'none');
    this.renderer.setStyle(this.el.nativeElement, '-ms-overflow-style', 'none');
    this.renderer.setStyle(this.el.nativeElement, '-webkit-scrollbar', 'none');

    this.scrollbarTrack = this.renderer.createElement('div');
    this.renderer.setStyle(this.scrollbarTrack, 'position', 'absolute');
    this.renderer.setStyle(this.scrollbarTrack, 'top', '5px');
    this.renderer.setStyle(this.scrollbarTrack, 'right', '2px');
    this.renderer.setStyle(this.scrollbarTrack, 'width', '6px');
    this.renderer.setStyle(this.scrollbarTrack, 'height', '100%');
    this.renderer.setStyle(this.scrollbarTrack, 'opacity', '0');
    this.renderer.setStyle(this.scrollbarTrack, 'transition', 'opacity 0.3s ease-in-out');
    this.renderer.setStyle(this.scrollbarTrack, 'pointer-events', 'none');
    this.renderer.setStyle(this.scrollbarTrack, 'z-index', '40');

    this.scrollbarThumb = this.renderer.createElement('div');
    this.renderer.setStyle(this.scrollbarThumb, 'width', '100%');
    this.renderer.setStyle(
      this.scrollbarThumb,
      'background-color',
      'var(--zap-global-scrollbar-color, #888)',
    );
    this.renderer.setStyle(this.scrollbarThumb, 'border-radius', '4px');
    this.renderer.setStyle(this.scrollbarThumb, 'position', 'absolute');
    this.renderer.setStyle(this.scrollbarThumb, 'left', '0');
    this.renderer.setStyle(this.scrollbarThumb, 'transition', 'transform 0.1s linear');

    this.renderer.appendChild(this.scrollbarTrack, this.scrollbarThumb);

    this.renderer.appendChild(this.el.nativeElement, this.scrollbarTrack);

    this.resizeObserver = new ResizeObserver(() => this.updateScrollbar());
  }

  ngAfterViewInit() {
    this.updateScrollbar();
    this.resizeObserver.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.resizeObserver.disconnect();
  }

  @HostListener('scroll')
  onScroll() {
    if (!this.isScrolling) {
      this.isScrolling = true;
      requestAnimationFrame(() => {
        this.updateScrollbar();
        this.isScrolling = false;
      });
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.setStyle(this.scrollbarTrack, 'opacity', '1');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.setStyle(this.scrollbarTrack, 'opacity', '0');
  }

  private updateScrollbar() {
    const scrollElement = this.el.nativeElement;
    const containerHeight = scrollElement.clientHeight;
    const contentHeight = scrollElement.scrollHeight;
    const parentElement = scrollElement.parentElement;
    const parentHeight = parentElement ? parentElement.clientHeight : 0;

    if (contentHeight <= Math.max(containerHeight) || contentHeight <= parentHeight) {
      this.renderer.setStyle(this.scrollbarTrack, 'display', 'none');
      return;
    }

    this.renderer.setStyle(this.scrollbarTrack, 'display', 'block');

    this.thumbHeight = Math.max(40, (containerHeight / contentHeight) * containerHeight);
    this.renderer.setStyle(this.scrollbarThumb, 'height', `${this.thumbHeight}px`);

    const maxThumbPosition = containerHeight - this.thumbHeight;
    this.thumbPosition =
      (scrollElement.scrollTop / (contentHeight - containerHeight)) * maxThumbPosition;

    this.renderer.setStyle(this.scrollbarThumb, 'transform', `translateY(${this.thumbPosition}px)`);
  }
}
