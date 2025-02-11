import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[zapBtnIcon]',
  standalone: true,
})
export class ZapButtonIconDirective {
  constructor(public el: ElementRef) {}
}
