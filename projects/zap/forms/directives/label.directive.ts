import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[zapLabel]', standalone: true })
export class ZapLabelDirective {
  constructor(public el: ElementRef) {}
}
