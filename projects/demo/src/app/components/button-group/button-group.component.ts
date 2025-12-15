import { Component } from '@angular/core';
import {
  ZapButton,
  ZapButtonGroup,
  ZapDropdown,
  ZapDropdownMenu,
  ZapDropdownMenuGroup,
  ZapDropdownMenuItem,
  ZapDropdownMenuLabel,
  ZapDropdownMenuShortcut,
  ZapDropdownSeparator,
  ZapDropdownTrigger,
  ZapIconDirective,
} from 'zap';

@Component({
  selector: 'app-button-group',
  imports: [
    ZapButtonGroup,
    ZapButton,
    ZapDropdown,
    ZapDropdownTrigger,
    ZapDropdownMenu,
    ZapDropdownMenuGroup,
    ZapDropdownMenuItem,
    ZapDropdownMenuLabel,
    ZapDropdownMenuShortcut,
    ZapDropdownSeparator,
    ZapIconDirective,
  ],
  templateUrl: './button-group.component.html',
  styleUrl: './button-group.component.scss',
})
export class ButtonGroupComponent {
  isOpen = false;
}
