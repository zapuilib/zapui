import { Component } from '@angular/core';

@Component({
  selector: 'ngx-zen-table-footer',
  template: `
    <tfoot>
      <ng-content></ng-content>
    </tfoot>
  `
})
export class TableFooterComponent {}