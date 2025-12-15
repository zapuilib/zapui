import {
  Component,
  ContentChildren,
  QueryList,
  AfterViewInit,
  signal,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import { CodeComponent } from '../code/code.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-code-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rounded-2xl overflow-hidden relative">
      @if (tabs.length > 1) {
        <div class="flex bg-zinc-900 text-xs w-full border-b border-zinc-800">
          @for (tab of tabs; track $index; let i = $index) {
            <button
              (click)="selectedTab.set(i)"
              class="px-4 pt-4 pb-2 text-zinc-400 border-b cursor-pointer border-transparent transition-all hover:text-zinc-300"
              [ngClass]="{
                '!border-zinc-300 !text-zinc-300': selectedTab() === i,
              }">
              {{ tab }}
            </button>
          }
        </div>
      }
      <ng-container *ngFor="let code of codeComponents; let i = index">
        <ng-container *ngIf="selectedTab() === i">
          <ng-container [ngTemplateOutlet]="code.templateRef"></ng-container>
        </ng-container>
      </ng-container>
    </div>
  `,
})
export class CodeGroupComponent implements AfterViewInit {
  @ContentChildren(CodeComponent) codeComponents!: QueryList<CodeComponent>;
  tabs: string[] = [];
  selectedTab = signal(0);

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.tabs = this.codeComponents.map((code) => code.title || code.language);
    this.cdr.detectChanges();
  }
}
