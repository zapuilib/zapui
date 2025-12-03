import { Component } from '@angular/core';
import { ZapButton } from 'zap';
import { ZapModal } from 'zap';

@Component({
  selector: 'app-modal',
  imports: [ZapModal, ZapButton],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  modalOpen = false;
}
