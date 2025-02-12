import { Directive, ElementRef } from '@angular/core';

@Directive({ selector: '[zapDialogButton]', standalone: true })
export class ZapDialogButtonDirective {
  constructor(public el: ElementRef) {}
}
