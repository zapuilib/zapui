import {
  AfterViewInit,
  Component,
  ContentChild,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZapDialogFooterDirective } from './dialog-footer.directive';

@Component({
  selector: 'zap-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class ZapDialog implements AfterViewInit {
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Input() title = 'Are you sure?';
  @Input() text = '';
  @Input() closeAction = 'No, cancel';
  @Input() confirmAction = 'Yes, confirm';
  @Input() zapClass = '';
  @Input() shape!: 'curve' | 'pill' | 'flat';
  @Input() position: 'top' | 'default' = 'default';
  @Input() showOverlay = false;
  @HostListener('document:keydown', ['$event'])
  handleEsc(event: KeyboardEvent): void {
    if (event.key === 'Escape' || event.code === 'Escape') this.close.emit();
  }
  @ContentChild(ZapDialogFooterDirective, { static: false })
  footerDirective!: ZapDialogFooterDirective;

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.handleDirectiveStyle();
  }

  ngAfterViewInit(): void {
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

  get classes(): string[] {
    return [this.shape, this.position, this.zapClass].filter((cls) => cls && cls !== 'default');
  }

  get overlayClasses(): string[] {
    return this.zapClass.split(' ').filter((cls) => cls.startsWith('overlay:'));
  }
}
