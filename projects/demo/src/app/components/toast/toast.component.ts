import { Component, Input } from '@angular/core';
import { ZapButton, ZapToast, ZapToastService } from 'zap/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [ZapToast, ZapButton],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  @Input() service: boolean = false;
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
      actioned: this.handleDismiss.bind(this),
      title: 'Uh oh!',
      text: 'This is a toast',
      shape: 'curve',
      type: 'default',
    });
  }

  handleActionClick() {
    window.alert('Action clicked!');
  }
}
