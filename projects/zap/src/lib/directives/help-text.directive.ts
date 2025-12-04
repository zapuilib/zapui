import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[zapHelpText]', standalone: true })
export class ZapHelpTextDirective {
  constructor(public el: ElementRef) {}
}
