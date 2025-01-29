import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {
  ZenButtonComponent,
  ZenAlertComponent,
  ZenBadgeComponent,
  ZenChipComponent,
  ZenDialogComponent,
  ZenModalComponent
} from 'ngx-zen/core';

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
    ZenModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
