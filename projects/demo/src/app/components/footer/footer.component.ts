import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ZapButton } from 'zap';
import { NAVIGATIONS } from '../../constants/navigations.constant';

@Component({
  selector: 'app-footer',
  imports: [ZapButton],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  navigations: any[] = NAVIGATIONS;
  year = new Date().getFullYear();
  previous: string = '';
  next: string = '';

  constructor(private router: Router) {}

  navigateTo(url: string) {
    this.router.navigate([url.replace(/\s+/g, '-').toLowerCase()]);
  }
}
