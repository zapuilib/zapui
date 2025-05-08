import { Component } from '@angular/core';

@Component({
  selector: 'required-indicator',
  imports: [],
  template: ` <span class="required-indicator" aria-hidden="true">*</span> `,
  styles: [
    `
      .required-indicator {
        color: rgba(var(--zap-color-error), 1);
      }
    `,
  ],
})
export class RequiredIndicatorComponent {}
