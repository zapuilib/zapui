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
  selector: 'ngx-zen-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ZenModalComponent implements OnInit {
  @ViewChild('modalContent') modalContent!: ElementRef;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Input() shape!: 'curve' | 'default' | 'pill';
  @Input() size: 'small' | 'wide' | 'wider' | 'default' = 'default';
  @Input() zenClass: string = '';
  @Input() style: 'classic' | 'noblur' = 'classic';
  @HostListener('document:keydown', ['$event'])
  handleEsc(event: KeyboardEvent): void {
    if (event.key === 'Escape' || event.code === 'Escape') this.close.emit();
  }
  private globalConfig: { shape: string } = {
    shape: '',
  };
    
  ngOnInit(): void {
    const rootStyles = getComputedStyle(document.documentElement);
    this.globalConfig.shape = rootStyles.getPropertyValue('--zen-shape').trim();    
  }


  get classes(): string[] {
    return [
      this.shape || this.globalConfig.shape,
      this.size,
      this.style,
      this.zenClass,
    ].filter((cls) => cls && cls !== 'default');
  }
}
