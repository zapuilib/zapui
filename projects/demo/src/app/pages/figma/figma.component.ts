import { Component } from '@angular/core';
import { ZapButton } from 'zap';

@Component({
  selector: 'app-figma',
  imports: [ZapButton],
  templateUrl: './figma.component.html',
  styleUrl: './figma.component.scss',
})
export class FigmaComponent {
  openFigmaKit() {
    window.open('https://www.figma.com/community/file/1481241069673878582', '_blank');
  }
}
