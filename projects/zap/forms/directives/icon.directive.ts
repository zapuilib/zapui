import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[zapFormFieldIcon]',
  standalone: true,
})
export class ZapFormFieldIconDirective {
  constructor(public el: ElementRef) {}
}
