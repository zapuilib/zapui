import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-internal-layout',
  templateUrl: './internal-layout.component.html',
  styleUrl: './internal-layout.component.scss',
})
export class InternalLayoutComponent {
  theme: string = 'light';

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.theme = params['theme'] || 'light';
    });
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';

    this.router.navigate([], {
      queryParams: { theme: this.theme },
      queryParamsHandling: 'merge',
    });
  }
}
