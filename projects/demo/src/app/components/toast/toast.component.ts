import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { ZapButton } from 'zap';
import { ZapToast, ZapToastService } from 'zap';

@Component({
  selector: 'app-toast',
  imports: [ZapToast, ZapButton],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  @Input() service: boolean = false;
  @ViewChild('customToastTpl', { read: TemplateRef }) customToastTpl!: TemplateRef<unknown>;
  title = 'Schedule a meeting';
  text = 'Friday, February 10, 2023 at 5:57 PM';
  action = 'Undo';

  constructor(private toastService: ZapToastService) {}

  handleDismiss() {
    window.alert('Dismissed!');
    this.toastService.dismiss();
  }

  showToast() {
    this.toastService.show({
      template: this.customToastTpl,
      templateContext: { title: 'Template Toast' },
      position: 'top',
      duration: 4000,
      type: 'default',
      shape: 'curve',
      zapClass: '',
    });
  }

  handleActionClick() {
    window.alert('Action clicked!');
  }
}
