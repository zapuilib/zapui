
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  HostBinding,
  Inject,
} from '@angular/core';

import { NgxZenConfig } from '../../../interfaces/config.interface';
import { NGX_ZEN_CONFIG } from '../../../tokens/ngx-zen.tokens';
import { Styles } from '../../../interfaces/style.interface';

@Component({
  selector: 'ngx-zen-table-column',
  template: `
    <th class="__zen__table__column" [ngStyle]="getHeaderStyle()">
      <div class="column-content text-re" [ngStyle]="getStyle()">
        <ng-content></ng-content>
        @if(sortable) {
        <i class="fa-solid fa-sort sort-handler" (click)="onSort()" [ngStyle]="getStyle()"></i>
        }
      </div>
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
  @Input() sortable: boolean = false;
  @HostBinding('style.width') get getWidth() {
    return this.width;
  }
  index: number = 0;
  isHeader: boolean = false;
  sortDirection: 'asc' | 'desc' | null = null;


  constructor(
    @Inject(NGX_ZEN_CONFIG) public config: NgxZenConfig
  ) {}


  getHeaderStyle(): Styles {
    return {
      borderColor: this.config.colors.secondary,
    };
  }

  getStyle(): Styles {
    return {
      color: this.config.colors.secondary,
      fontSize: this.config.fontSize.md,
    };
  }

  onSort(): void {
    if (!this.sortable) return;
    if (this.sortDirection === 'asc') {
      this.sortDirection = 'desc';
    } else if (this.sortDirection === 'desc') {
      this.sortDirection = 'asc';
    } else {
      this.sortDirection = 'asc';
    }
    this.sort.emit({ field: this.field, direction: this.sortDirection });
  }
}
