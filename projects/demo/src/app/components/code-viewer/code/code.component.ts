import { CommonModule } from '@angular/common';
import { Component, Input, Optional, TemplateRef, ViewChild } from '@angular/core';
import { Highlight } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';
import { CodeGroupComponent } from '../code-group/code-group.component';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [Highlight, CommonModule, HighlightLineNumbers],
  template: `
    @if (isStandalone) {
      <div class="rounded-2xl overflow-hidden relative" [ngClass]="classes">
        @if (title) {
          <p class="!text-xs px-4 !pt-3.5 !pb-1.5 !text-white bg-zinc-900 border-b border-zinc-800">
            {{ title }}
          </p>
        }
        <div class="px-7 py-5 bg-zinc-900 group code-block">
          <pre><code [highlight]="markdown" [language]="language" lineNumbers></code></pre>
          <div
            class="hidden group-hover:inline-flex py-1.5 px-3 border backdrop-blur-sm rounded-full items-center text-xs absolute top-14 right-4 cursor-pointer min-w-[70px] justify-center"
            (click)="copyCode()"
            [ngClass]="
              copied
                ? 'text-green-500 bg-green-800/20 border-green-800'
                : 'text-zinc-500 bg-zinc-800/30 border-zinc-800/30 hover:bg-zinc-800 hover:border-zinc-800'
            ">
            @if (!copied) {
              <i class="fa-regular fa-clipboard pr-2"></i>
            }
            <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
          </div>
        </div>
      </div>
    } @else {
      <ng-container [ngTemplateOutlet]="codeTemplate"></ng-container>
    }

    <ng-template #codeTemplate>
      <div class="px-7 py-5 bg-zinc-900 group code-block">
        <pre><code [highlight]="markdown" [language]="language" lineNumbers></code></pre>
        <div
          class="hidden group-hover:inline-flex py-1.5 px-3 border backdrop-blur-sm rounded-full items-center text-xs absolute top-20 right-4 cursor-pointer min-w-[70px] justify-center"
          (click)="copyCode()"
          [ngClass]="
            copied
              ? 'text-green-500 bg-green-800/20 border-green-800'
              : 'text-zinc-500 bg-zinc-800/30 border-zinc-800/30 hover:bg-zinc-800 hover:border-zinc-800'
          ">
          @if (!copied) {
            <i class="fa-regular fa-clipboard pr-2"></i>
          }
          <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
        </div>
      </div>
    </ng-template>
  `,
})
export class CodeComponent {
  @Input() markdown: string = 'Your code here';
  @Input() language: string = 'html';
  @Input() title?: string;
  @Input() customClass: string = '';

  @ViewChild('codeTemplate', { static: true }) templateRef!: TemplateRef<any>;

  copied: boolean = false;

  constructor(@Optional() private parentGroup: CodeGroupComponent) {}

  get isStandalone(): boolean {
    return !this.parentGroup;
  }

  copyCode() {
    if (!this.markdown) {
      console.error('No content to copy');
      return;
    }

    navigator.clipboard
      .writeText(this.markdown)
      .then(() => {
        console.log('Copied:', this.markdown);
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 1000);
      })
      .catch((err) => console.error('Copy failed', err));
  }

  get classes(): string {
    return this.customClass;
  }
}
