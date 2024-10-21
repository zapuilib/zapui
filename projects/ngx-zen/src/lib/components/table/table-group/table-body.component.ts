import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'ngx-zen-table-body',
  template: '<ng-content></ng-content>'
})
export class TableBodyComponent {
  @ContentChild(TemplateRef) rowTemplate!: TemplateRef<any>;
}
