import { Component, Input } from '@angular/core';

import { CodeComponent } from '../../components/code-viewer/code/code.component';
import { CodeGroupComponent } from '../../components/code-viewer/code-group/code-group.component';

@Component({
  selector: 'row',
  imports: [CodeComponent, CodeGroupComponent],
  templateUrl: './row.component.html',
  styleUrl: './row.component.scss',
})
export class RowComponent {
  @Input() markdowns: { title: string; markdown: string; language: string }[] = [];
  @Input() isReverse: boolean = false;
}
