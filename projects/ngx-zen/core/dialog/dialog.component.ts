import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngx-zen-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class ZenDialogComponent implements OnInit {
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Input() title: string = 'Are you sure?';
  @Input() text: string = 'This action cannot be undone.';
  @Input() zenClass: string = '';
  @Input() shape!: 'curve' | 'pill' | 'default';
  @Input() position: 'top' | 'default' = 'default';
  @Input() primaryBtnTemplate: TemplateRef<any> | null = null;
  @Input() secondaryBtnTemplate: TemplateRef<any> | null = null;
  @HostListener('document:keydown', ['$event'])
  handleEsc(event: KeyboardEvent): void {
    if (event.key === 'Escape' || event.code === 'Escape') this.cancel.emit();
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
      this.position,
      this.zenClass,
    ].filter((cls) => cls && cls !== 'default')
  }
}
