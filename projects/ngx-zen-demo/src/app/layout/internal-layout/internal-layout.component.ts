import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-internal-layout',
  templateUrl: './internal-layout.component.html',
  styleUrl: './internal-layout.component.scss',
})
export class InternalLayoutComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
}
