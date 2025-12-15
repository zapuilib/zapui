import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../../components/header/header.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  selector: 'landing-layout',
  templateUrl: 'landing.layout.html',
})
export class LandingLayout implements OnInit {
  constructor() {}

  ngOnInit() {}
}
