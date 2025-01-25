import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxButtonComponent } from 'ngx-zen/button';
import { NgxAlertComponent } from 'ngx-zen/alert';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxButtonComponent, NgxAlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
