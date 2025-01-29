import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import {
  ZenButtonComponent,
  ZenAlertComponent,
  ZenBadgeComponent,
  ZenChipComponent,
  ZenDialogComponent,
  ZenModalComponent
} from 'ngx-zen/core';
import { ZenInputComponent } from 'ngx-zen/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ZenAlertComponent,
    ZenBadgeComponent,
    ZenButtonComponent,
    ZenChipComponent,
    ZenDialogComponent,
    ZenModalComponent,
    ZenInputComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  usernameControl = new FormControl('', [Validators.required]);
}
