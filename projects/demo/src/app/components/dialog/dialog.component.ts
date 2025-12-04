import { Component } from '@angular/core';
import { ZapButton } from 'zap';
import { ZapDialog, ZapDialogFooterDirective } from 'zap';

@Component({
  selector: 'app-dialog',
  imports: [ZapDialog, ZapButton, ZapDialogFooterDirective],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  dialogOpen = false;
}
