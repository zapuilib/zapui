import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[zapDialogFooter]', standalone: true })
export class ZapDialogFooterDirective {
  constructor(public el: ElementRef) {}
}
