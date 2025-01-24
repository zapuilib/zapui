import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxZenModule } from 'ngx-zen';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxZenModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
