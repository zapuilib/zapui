import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../../components/header/header.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NAVIGATIONS } from '../../constants/navigations.constant';
import { BannerComponent } from '../../components/banner/banner.component';

@Component({
  imports: [
    RouterOutlet,
    HeaderComponent,
    SidenavComponent,
    FooterComponent,
    BannerComponent,
    RouterModule,
  ],
  selector: 'docs-layout',
  templateUrl: 'docs.layout.html',
  styleUrls: ['docs.layout.scss'],
})
export class DocsLayout implements OnInit {
  navigations: any[] = NAVIGATIONS;
  constructor(private router: Router) {}

  ngOnInit() {}
}
