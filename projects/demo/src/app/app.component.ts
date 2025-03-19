import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './components/button/button.component';
import { BadgeComponent } from './components/badge/badge.component';
import { ChipComponent } from './components/chip/chip.component';
import { AlertComponent } from './components/alert/alert.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { InputComponent } from './components/input/input.component';
import { ModalComponent } from './components/modal/modal.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { SelectComponent } from './components/select/select.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { RadioComponent } from './components/radio/radio.component';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { ToggleComponent } from './components/toggle/toggle.component';
import { ToastComponent } from './components/toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    BadgeComponent,
    ChipComponent,
    AlertComponent,
    DialogComponent,
    InputComponent,
    ModalComponent,
    DatePickerComponent,
    TooltipComponent,
    SelectComponent,
    AccordionComponent,
    CheckboxComponent,
    TextareaComponent,
    RadioComponent,
    ThemeSwitcherComponent,
    ToggleComponent,
    ToastComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
