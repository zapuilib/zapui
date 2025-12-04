import { Component } from '@angular/core';
import { ZapChip, ZapIconDirective } from 'zap';

@Component({
  selector: 'app-chip',
  imports: [ZapChip, ZapIconDirective],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
})
export class ChipComponent {}
