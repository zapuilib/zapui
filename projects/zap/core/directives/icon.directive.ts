import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[zapIcon]',
  standalone: true,
})
export class ZapIconDirective {
  constructor(public el: ElementRef) {}
}
