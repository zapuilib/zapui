import { Input } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.scss',
})
export class CodeBlockComponent {
  @Input() markdownData: string = '';

  onCopyToClipboard() {}
}
