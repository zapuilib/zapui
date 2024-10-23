import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  HostBinding,
} from '@angular/core';

@Component({
  selector: 'ngx-zen-table-column',
  template: `
    <th class="__zen__table__column">
      <ng-content></ng-content>
    </th>
  `,
  styleUrls: ['./table-component.style.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TableColumnComponent {
  @Output() sort = new EventEmitter<{
    field: string;
    direction: 'asc' | 'desc';
  }>();
  @Input() field: string = '';
  @Input() size: 'compact' | 'default' | 'large' = 'default';
  @Input() width: string = '';
  @HostBinding('style.width') get getWidth() {
    return this.width;
  }
  index: number = 0;
  isHeader: boolean = false;
}
