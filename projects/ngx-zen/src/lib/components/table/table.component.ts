// table.component.ts
import {
  Component,
  Input,
  Inject,
  Output,
  EventEmitter,
  ContentChild,
  ContentChildren,
  QueryList,
  AfterContentInit
} from '@angular/core';

import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';
import { NgxZenConfig } from '../../interfaces/config.interface';
import { ColorUtility } from '../../utilities/color.utility';
import { TableHeadComponent } from './table-group/table-head.component';
import { TableBodyComponent } from './table-group/table-body.component';
import { TableColumnComponent } from './table-group/table-column.component';

@Component({
  selector: 'ngx-zen-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterContentInit {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() zenClass: string = '';
  @Input() size: 'compact' | 'default' | 'large' = 'default';
  @Input() shape: 'curve' | 'default' = 'default';
  @Input() transition: 'smooth' | 'snappy' | 'none' = 'smooth';
  @Input() disabled: boolean = false;
  @Input() sortable: boolean = false;
  @Input() selectable: boolean = false;

  @Output() sort = new EventEmitter<any>();
  @Output() select = new EventEmitter<any>();

  @ContentChild(TableHeadComponent) tableHead?: TableHeadComponent;
  @ContentChild(TableBodyComponent) tableBody?: TableBodyComponent;
  @ContentChildren(TableColumnComponent) columns!: QueryList<TableColumnComponent>;

  constructor(
      @Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig,
      private colorUtility: ColorUtility
  ) {}

  ngAfterContentInit() {
      if (this.columns) {
          this.columns.forEach((column, index) => {
              column.index = index;
              column.size = this.size;
              column.sortable = this.sortable;
          });
      }

      if (this.tableHead) {
          this.tableHead.size = this.size;
      }

      if (this.tableBody) {
          this.tableBody.size = this.size;
          this.tableBody.selectable = this.selectable;
      }
  }

  getTableStyle(): Record<string, string> {
    const color = this.disabled
      ? this.colorUtility.hexToRgba(this.config.colors.secondary, 0.5)
      : this.config.colors.secondary;

    const fontSize =
      this.size === 'compact'
        ? this.config.fontSize.md
        : this.config.fontSize.lg;

    return {
      color,
      'font-size': fontSize,
    };
  }


  getSubtitleStyle(): Record<string, string> {
      const fontSize =
          this.size === 'compact'
              ? this.config.fontSize.md
              : this.config.fontSize.lg;

      const mutedColor = this.colorUtility.hexToRgba(
          this.config.colors.quaternary,
          0.5
      );

      return {
          'font-size': fontSize,
          color: mutedColor,
          'margin-top': '0.25rem',
      };
  }

  onSort(event: any) {
      this.sort.emit(event);
  }

  onSelect(event: any) {
      this.select.emit(event);
  }
}