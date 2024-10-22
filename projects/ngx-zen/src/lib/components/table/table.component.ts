// projects/ngx-zen/src/lib/components/table/table.component.ts

import { Component, Input, ContentChildren, QueryList, AfterContentInit, Output, EventEmitter, Inject } from '@angular/core';
import { TableHeadComponent } from './table-group/table-head.component';
import { TableBodyComponent } from './table-group/table-body.component';
import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';
import { NgxZenConfig } from '../../interfaces/config.interface';
import { ColorUtility } from '../../utilities/color.utility';

@Component({
  selector: 'ngx-zen-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterContentInit {
  @ContentChildren(TableHeadComponent) headComponents!: QueryList<TableHeadComponent>;
  @ContentChildren(TableBodyComponent) bodyComponents!: QueryList<TableBodyComponent>;

  @Input() zenClass: string = '';
  @Input() size: 'compact' | 'default' | 'large' = 'default';
  @Input() shape: 'curve' | 'default' = 'default';
  @Input() striped: boolean = false;
  @Input() hoverable: boolean = false;
  @Input() borderless: boolean = false;
  @Input() searchable: boolean = false;
  @Input() selectable: boolean = false;
  @Input() sortable: boolean = false;

  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() sortChange = new EventEmitter<{ field: string; direction: 'asc' | 'desc' }>();

  constructor(
    @Inject(NGX_ZEN_CONFIG) private config: NgxZenConfig,
    private colorUtility: ColorUtility
  ) {}

  ngAfterContentInit() {}

  onSelectionChange(selection: any[]) {
    this.selectionChange.emit(selection);
  }

  onSortChange(sort: { field: string; direction: 'asc' | 'desc' }) {
    this.sortChange.emit(sort);
  }

  getTableWrapperStyle(): Record<string, string> {
    return {
      'background-color': this.config.colors.secondary,
      'border-radius': this.shape === 'curve' ? '0.5rem' : '0',
      'overflow': 'hidden',
      'box-shadow': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    };
  }
  
  getTableStyle(): Record<string, string> {
    return {
      'width': '100%',
      'border-collapse': 'separate',
      'border-spacing': '0',
    };
  }
  
  getTableHeadStyle(): Record<string, string> {
    return {
      'background-color': this.config.colors.tertiary,
    };
  }
  
  getTableCellStyle(): Record<string, string> {
    const fontSize = this.size === 'compact' ? this.config.fontSize.sm : this.config.fontSize.md;
    return {
      'padding': this.size === 'compact' ? '0.5rem 1rem' : '0.75rem 1.5rem',
      'font-size': fontSize,
      'border-bottom': this.borderless ? 'none' : `1px solid ${this.colorUtility.hexToRgba(this.config.colors.primary, 0.1)}`,
    };
  }
  
  getStripedRowStyle(index: number): Record<string, string> {
    if (this.striped && index % 2 !== 0) {
      return { 'background-color': this.colorUtility.hexToRgba(this.config.colors.primary, 0.05) };
    }
    return {};
  }
}