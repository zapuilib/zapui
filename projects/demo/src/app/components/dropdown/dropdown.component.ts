import { Component } from '@angular/core';
import {
  ZapButton,
  ZapDropdown,
  ZapDropdownMenu,
  ZapDropdownMenuGroup,
  ZapDropdownMenuItem,
  ZapDropdownMenuLabel,
  ZapDropdownMenuPortal,
  ZapDropdownMenuShortcut,
  ZapDropdownMenuSub,
  ZapDropdownMenuSubTrigger,
  ZapDropdownSeparator,
  ZapDropdownTrigger,
} from 'zap/core';

@Component({
  selector: 'app-dropdown',
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
    ZapDropdownMenuPortal,
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
})
export class DropdownComponent {
  isOpen = false;

  onMenuItemClick() {
    window.alert('Action performed');
    this.isOpen = false;
  }
}
