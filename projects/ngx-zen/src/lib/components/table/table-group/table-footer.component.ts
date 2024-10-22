import { Component } from '@angular/core';

@Component({
  selector: 'ngx-zen-table-footer',
  template: `
    <tfoot>
      <tr>
          <ng-content></ng-content>
      </tr>
    </tfoot>
  `
})
export class TableFooterComponent {}
