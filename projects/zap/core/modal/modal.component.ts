import {
  AfterContentInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'zap-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ZapModal {
  @ViewChild('modalContent') modalContent!: ElementRef;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Input() shape!: 'curve' | 'flat' | 'pill';
  @Input() size: 'tight' | 'compact' | 'base' | 'wide' | 'full' = 'tight';
  @Input() zapClass: string = '';
  @HostListener('document:keydown', ['$event'])
  handleEsc(event: KeyboardEvent): void {
    if (event.key === 'Escape' || event.code === 'Escape') this.close.emit();
  }

  get classes(): string[] {
    return [
      this.shape,
      this.size,
      this.zapClass,
    ].filter((cls) => cls && cls !== 'default');
  }
}
