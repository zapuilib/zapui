import { Component } from '@angular/core';
import { ZapBreadcrumb, ZapIconDirective } from 'zap';

@Component({
  selector: 'app-breadcrumb',
  imports: [ZapBreadcrumb, ZapIconDirective],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class BreadcrumbComponent {
  items = [{ label: 'Home', url: '/' }, { label: 'About', url: '/about' }, { label: 'Contact' }];
}
