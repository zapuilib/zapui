import { Component } from '@angular/core';
import { ZapButton, ZapDialog, ZapDialogFooterDirective } from 'zap';

import { TitleComponent } from '../../components/title/title.component';
import { CodeComponent } from '../../components/code-viewer/code/code.component';
import { SpacerComponent } from '../../components/spacer/spacer.component';
import { RowComponent } from '../../components/row/row.component';
import { PreviewCodeComponent } from '../../components/preview-code/preview-code.component';

@Component({
  selector: 'app-dialog',
  imports: [
    TitleComponent,
    SpacerComponent,
    RowComponent,
    ZapButton,
    ZapDialog,
    ZapDialogFooterDirective,
    PreviewCodeComponent,
    CodeComponent,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  shape: 'curve' | 'pill' | 'flat' = 'flat';
  position: 'default' | 'top' = 'default';
  basicDialogOpen = false;
  customDialogOpen = false;
  basicComponentHtml = `<zap-dialog 
  title="Are you sure?" 
  text="This action cannot be undone" 
  (close)="onClose()" 
  (confirm)="onConfirm()">
</zap-dialog>`;
  markdown: { title: string; markdown: string; language: string }[] = [
    {
      title: 'html',
      markdown: `<zap-dialog 
  title="Are you sure?" 
  text="This action cannot be undone" 
  [showOverlay]="true"
  (close)="onClose()" 
  (confirm)="onConfirm()">
</zap-dialog>`,
      language: 'html',
    },
  ];
  markdownDirective: { title: string; markdown: string; language: string } = {
    title: 'html',
    markdown: `<zap-dialog [showOverlay]="true">
  <div zapDialogFooter>
    <zap-button
      text="No"
      size="wide"
      variant="outlined"
    ></zap-button>
    <zap-button
      text="Yes"
      size="wide"
      type="default"
    ></zap-button>
  </div>
  <p class="text-zinc-500">
   Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit laudantium dolores ut voluptates quaerat consequuntur.
  </p>
</zap-dialog>`,
    language: 'html',
  };
  markdownGlobal: { title: string; markdown: string; language: string } = {
    title: 'app.config.ts',
    markdown: `const ngxConfig: ZapConfig = {
  components: { 
    dialog: {
      shape: 'curve'; 
      styles: {
        colors: {
          dark: {
            bgColor: '#FFFFFF';
          };
        },
        borderRadius: '15px',      
      },
    },
  },
}`,
    language: 'typescript',
  };

  updateMarkdown(): void {
    const attributes = [
      this.shape !== 'curve' ? `shape="${this.shape}"` : '',
      this.position !== 'default' ? `position="${this.position}"` : '',
    ]
      .filter((attr) => attr)
      .join(' ');

    this.basicComponentHtml = `<zap-dialog 
  title="Are you sure?" 
  text="This action cannot be undone" 
  ${attributes}
  (close)="onClose()" 
  (confirm)="onConfirm()">
</zap-dialog>`;
    this.markdown[0].markdown = this.basicComponentHtml;
  }

  updateShape(shape: 'curve' | 'pill' | 'flat'): void {
    this.shape = shape;
    this.updateMarkdown();
  }

  updatePosition(position: 'default' | 'top'): void {
    this.position = position;
    this.updateMarkdown();
  }

  onClose(): void {
    this.basicDialogOpen = false;
  }

  onConfirm(): void {
    this.basicDialogOpen = false;
  }
}
