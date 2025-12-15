import { Component, Input } from '@angular/core';

@Component({
  selector: 'spacer',
  imports: [],
  templateUrl: './spacer.component.html',
  styleUrl: './spacer.component.scss',
})
export class SpacerComponent {
  @Input() height: string = '20px';
}
