import { Component, Input, Output, EventEmitter, inject, computed, signal, booleanAttribute } from '@angular/core';
import { NGX_ZEN_CONFIG } from '../../tokens/ngx-zen.tokens';
import { NgxZenConfig } from '../../interfaces/config.interface';

@Component({
  selector: 'ngx-zen-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  host: {
    '[class]': 'hostClasses()'
  }
})
export class TableComponent {
  @Input() data: any[] = [];
  @Input() columns: { key: string; header: string }[] = [];
  @Input() zenClass = '';
  @Input({ transform: booleanAttribute }) striped = false;
  @Input({ transform: booleanAttribute }) hover = false;
  @Input({ transform: booleanAttribute }) bordered = false;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  @Output() rowClick = new EventEmitter<any>();

  private config = inject<NgxZenConfig>(NGX_ZEN_CONFIG);

  tableClasses = computed(() => ({
    'striped': this.striped,
    'hover': this.hover,
    'bordered': this.bordered
  }));

  hostClasses = computed(() => `${this.zenClass} ${this.size}`);

  onRowClick(row: any) {
    this.rowClick.emit(row);
  }
}