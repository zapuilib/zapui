import { Component } from '@angular/core';
import { ZapButton, ZapModal } from 'zap/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ZapModal, ZapButton],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  modalOpen = false;
}
