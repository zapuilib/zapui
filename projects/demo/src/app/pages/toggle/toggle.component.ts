import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ZapToggle, ZapHelpTextDirective, ZapLabelDirective } from 'zap';

import { SpacerComponent } from '../../components/spacer/spacer.component';
import { TitleComponent } from '../../components/title/title.component';
import { RowComponent } from '../../components/row/row.component';
import { PreviewCodeComponent } from '../../components/preview-code/preview-code.component';
import { CodeComponent } from '../../components/code-viewer/code/code.component';

@Component({
  selector: 'app-toggle',
  imports: [
    ZapToggle,
    ZapLabelDirective,
    ZapHelpTextDirective,
    SpacerComponent,
    TitleComponent,
    RowComponent,
    PreviewCodeComponent,
    ReactiveFormsModule,
    FormsModule,
    CodeComponent,
  ],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss',
})
export class ToggleComponent {
  formControl: FormControl = new FormControl({
    value: false,
    disabled: false,
  });
  formControl2: FormControl = new FormControl({
    value: false,
    disabled: false,
  });
  label: string = 'Power mode';
  helpText: string = 'Increases battery life by 10%';
  basicComponentHtml: string = `<zap-toggle 
  label="Power mode" 
  helpText="Increases battery life by 10%">
</zap-toggle>`;
  markdown: { title: string; markdown: string; language: string }[] = [
    {
      title: 'html',
      markdown: `<zap-toggle 
  label="Power mode" 
  helpText="Increases battery life by 10%">
</zap-toggle>`,
      language: 'html',
    },
  ];
  markdownDirective: { title: string; markdown: string; language: string } = {
    title: 'html',
    markdown: `<zap-toggle id="toggle" [formControl]="formControl">
  <div zapLabel class="flex items-center gap-2">
    <i class="fa-solid fa-sun-bright"></i>
    <label>Select theme</label>
  </div>
  <p zapFormFieldHelpText>Switch between light and dark</p>
</zap-toggle>`,
    language: 'html',
  };
  markdownGlobal: { title: string; markdown: string; language: string } = {
    title: 'app.config.ts',
    markdown: `const ngxConfig: ZapConfig = {
  components: { 
    toggle: {
      styles: {
        colors: {
          dark: {
            bgColor: '#FFFFFF';
          };
        };
      }       
    }
  }
}`,
    language: 'typescript',
  };
}
