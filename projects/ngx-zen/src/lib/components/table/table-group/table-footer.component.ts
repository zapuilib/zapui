import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-zen-table-footer',
  template: `
    <tfoot>
      <tr>
          <ng-content></ng-content>
      </tr>
    </tfoot>
  `,
  encapsulation: ViewEncapsulation.None
})
export class TableFooterComponent {}
