import { Component, Input } from '@angular/core';

import { CodeComponent } from '../code-viewer/code/code.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preview-code',
  imports: [CommonModule, CodeComponent],
  templateUrl: './preview-code.component.html',
  styleUrl: './preview-code.component.scss',
})
export class PreviewCodeComponent {
  @Input() markdown!: { title: string; markdown: string; language: string };
  @Input() disableMinHeight = false;
  activeTab: string = 'preview';
}
