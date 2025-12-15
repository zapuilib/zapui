import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ZapChip } from 'zap';

@Component({
  selector: 'app-sidenav',
  imports: [RouterModule, ZapChip],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @Input() navigations: any[] = [];

  getChipClass(type: string): string {
    return `${
      type === 'Roadmap' ? 'light:!bg-zinc-300' : '!bg-purple-500'
    } !px-2 !py-0.5 !text-[10px]`;
  }
}
