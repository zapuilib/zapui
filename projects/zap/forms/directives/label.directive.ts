import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[zapLabel]', standalone: true, host: { '[style.display]': 'none' } })
export class ZapLabelDirective {
  constructor(public el: ElementRef) {}
}
