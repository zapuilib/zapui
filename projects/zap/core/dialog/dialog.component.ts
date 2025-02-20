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

import { ZapDialogButtonDirective } from './dialog-btn.directive';

@Component({
  selector: 'zap-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class ZapDialog{
  @Output() confirm: EventEmitter<void> = new EventEmitter<void>();
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  @Input() title: string = 'Are you sure?';
  @Input() text: string = '';
  @Input() zapClass: string = '';
  @Input() shape!: 'curve' | 'pill' | 'flat';
  @Input() position: 'top' | 'default' = 'default';
  @HostListener('document:keydown', ['$event'])
  handleEsc(event: KeyboardEvent): void {
    if (event.key === 'Escape' || event.code === 'Escape') this.cancel.emit();
  }
  @ContentChild(ZapDialogButtonDirective, { static: false })
  btnDirective!: ZapDialogButtonDirective;

  get classes(): string[] {
    return [this.shape, this.position, this.zapClass].filter(
      (cls) => cls && cls !== 'default'
    );
  }
}
