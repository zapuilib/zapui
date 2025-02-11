import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[zapButtonIcon]',
  standalone: true,
})
export class ZapButtonIconDirective {
  constructor(public el: ElementRef) {}
}
