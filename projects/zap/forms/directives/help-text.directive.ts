import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[zapFormFieldHelpText]', standalone: true })
export class ZapFormFieldHelpTextDirective {
  constructor(public el: ElementRef) {}
}
