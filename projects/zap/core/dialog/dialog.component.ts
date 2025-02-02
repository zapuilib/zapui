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
  selector: 'zap-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class ZapDialogComponent {
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Input() title: string = 'Are you sure?';
  @Input() text: string = 'This action cannot be undone.';
  @Input() zapClass: string = '';
  @Input() shape!: 'curve' | 'pill' | 'flat';
  @Input() position: 'top' | 'default' = 'default';
  @Input() primaryBtnTemplate: TemplateRef<any> | null = null;
  @Input() secondaryBtnTemplate: TemplateRef<any> | null = null;
  @HostListener('document:keydown', ['$event'])
  handleEsc(event: KeyboardEvent): void {
    if (event.key === 'Escape' || event.code === 'Escape') this.cancel.emit();
  }

  get classes(): string[] {
    return [
      this.shape,
      this.position,
      this.zapClass,
    ].filter((cls) => cls && cls !== 'default');
  }
}
