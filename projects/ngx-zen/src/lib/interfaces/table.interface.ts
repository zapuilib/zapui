export interface ColumnDef {
    key: string;
    header: string;
    type?: 'text' | 'number' | 'date' | 'custom';
    format?: string;
    customComponent?: any;
  }