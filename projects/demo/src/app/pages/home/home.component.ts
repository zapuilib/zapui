import { Component } from '@angular/core';
import { ZapButton, ZapInput, ZapCheckbox } from 'zap';
import { Router } from '@angular/router';

import { HomeWhyZapComponent } from './components/why-zap/why-zap.component';
import { RoadmapComponent } from './components/roadmap/roadmap.component';
import { FeaturesComponent } from './components/features/features.component';
import { HelpUsComponent } from './components/help-us/help-us.component';
import { OriginStoryComponent } from './components/origin-story/origin-story.component';
import { FooterHomeComponent } from './components/footer/footer-home.component';

@Component({
  selector: 'app-home',
  imports: [
    ZapButton,
    ZapInput,
    ZapCheckbox,
    HomeWhyZapComponent,
    RoadmapComponent,
    FeaturesComponent,
    HelpUsComponent,
    OriginStoryComponent,
    FooterHomeComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private router: Router) {}

  openQuickstart() {
    this.router.navigate(['/docs/getting-started']);
  }

  openDonate() {
    window.open('https://github.com/sponsors/zapuilib');
  }
}
