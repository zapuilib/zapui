import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  items: any[] = [
    {
      title: 'Introduction',
      routerLink: '/getting-started',
      subItems: [
        {
          title: 'Getting Started',
          routerLink: '/getting-started',
        },
        {
          title: 'Usages',
          routerLink: '/usages',
        },
      ],
    },
    {
      title: 'Components',
      routerLink: '/button',
      subItems: [
        {
          title: 'Alert',
          routerLink: '/alert',
        },
        {
          title: 'Button',
          routerLink: '/button',
        },
        {
          title: 'Checkbox',
          routerLink: '/checkbox',
        },
        {
          title: 'Dialog',
          routerLink: '/dialog',
        },
        {
          title: 'Input',
          routerLink: '/input',
        },
        {
          title: 'Modal',
          routerLink: '/modal',
        },
        {
          title: 'Snackbar',
          routerLink: '/snackbar',
        },
        {
          title: 'Textarea',
          routerLink: '/textarea',
        },
        {
          title: 'Tooltip',
          routerLink: '/tooltip',
        },
      ],
    },
  ];
  constructor(private route: ActivatedRoute) {}
}
