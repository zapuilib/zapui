import { Component } from '@angular/core';
import { ZapButton, ZapDialog, ZapDialogFooterDirective } from 'zap/core';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ZapDialog, ZapButton, ZapDialogFooterDirective],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  dialogOpen = false;
}
