import { Component, Input, ContentChildren, QueryList, AfterContentInit, Output, EventEmitter, Inject, ViewEncapsulation } from '@angular/core';
import { TableHeadComponent } from './table-group/table-head.component';
import { TableBodyComponent } from './table-group/table-body.component';
import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';
import { NgxZenConfig } from '../../interfaces/config.interface';
import { ColorUtility } from '../../utilities/color.utility';

@Component({
  selector: 'ngx-zen-table',
  templateUrl: './table.component.html',
  encapsulation: ViewEncapsulation.None
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
    @Inject(NGX_ZEN_CONFIG) public config: NgxZenConfig,
    private colorUtility: ColorUtility
  ) {}

  ngAfterContentInit() {

  }

  getTableStyle(): Record<string, string> {
    return {
      'width': '100%',
      'border-collapse': 'separate',
      'border-spacing': '0',
      'background-color': this.colorUtility.hexToRgba(this.config.colors.info, 0.05),
      'border-radius': this.shape === 'curve' ? '0.5rem' : '0',
      'overflow': 'hidden',
    };
  }

  getTableHeadStyle(): Record<string, string> {
    return {
      'background-color': this.config.colors.quaternary,
      'color': this.config.colors.info,
      'font-weight': '600',
    };
  }

  getTableCellStyle(): Record<string, string> {
    return {
      'padding': this.size === 'compact' ? '0.5rem' : '0.75rem',
      'border-bottom': this.borderless ? 'none' : 
        `1px solid ${this.colorUtility.hexToRgba(this.config.colors.quaternary, 0.1)}`,
    };
  }

  getStripedRowStyle(index: number): Record<string, string> {
    if (this.striped && index % 2 !== 0) {
      return { 
        'background-color': this.colorUtility.hexToRgba(this.config.colors.quaternary, 0.05)
      };
    }
    return {};
  }

  getHoverableRowStyle(): Record<string, string> {
    return {
      'background-color': this.colorUtility.hexToRgba(this.config.colors.tertiary, 0.1),
    };
  }

  getTableWrapperStyle(): Record<string, string> {
    return {
      'background-color': this.config.colors.secondary,
      'border-radius': this.shape === 'curve' ? '0.5rem' : '0',
    };
  }

  onSortChange(sort: { field: string; direction: 'asc' | 'desc' }) {
    this.sortChange.emit(sort);
  }

  onSelectionChange(selection: any[]) {
    this.selectionChange.emit(selection);
  }
}