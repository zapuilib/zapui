import { Component } from '@angular/core';
import {
  ZapButton,
  ZapDropdown,
  ZapDropdownMenu,
  ZapDropdownMenuGroup,
  ZapDropdownMenuItem,
  ZapDropdownMenuLabel,
  ZapDropdownMenuShortcut,
  ZapDropdownMenuSub,
  ZapDropdownMenuSubTrigger,
  ZapDropdownSeparator,
  ZapDropdownTrigger,
} from 'zap/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [
    ZapButton,
    ZapDropdown,
    ZapDropdownMenu,
    ZapDropdownMenuGroup,
    ZapDropdownMenuItem,
    ZapDropdownMenuLabel,
    ZapDropdownMenuShortcut,
    ZapDropdownMenuSub,
    ZapDropdownMenuSubTrigger,
    ZapDropdownSeparator,
    ZapDropdownTrigger,
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {}
