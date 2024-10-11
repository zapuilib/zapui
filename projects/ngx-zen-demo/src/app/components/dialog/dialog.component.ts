import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  markdowns = [
    {
      markdown: `\`\`\`html
<ngx-zen-dialog
    title="Confirm action"
    text="Are you sure you want to proceed? This action cannot be undone"
></ngx-zen-dialog>
  \`\`\``,
      title: 'Basic dialog',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-dialog
    title="Confirm action"
    shape="curve"
    text="Are you sure you want to proceed? This action cannot be undone"
></ngx-zen-dialog>
  \`\`\``,
      title: 'Curved dialog',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-dialog
    title="Confirm action"
    shape="pill"
    text="Are you sure you want to proceed? This action cannot be undone"
></ngx-zen-dialog>
  \`\`\``,
      title: 'Pill dialog',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-dialog title="Confirm action">
  <div>
    <h3 class="text-black">Title</h3>
    <p class="text-black">Here goes the custom content</p>
  </div>
</ngx-zen-dialog>
  \`\`\``,
      title: 'With custom content',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-dialog
    title="Confirm action"
    text="Are you sure you want to proceed? This action cannot be undone"
    [primaryBtnTemplate]="customPrimaryButton"
    [secondaryBtnTemplate]="customSecondaryButton"
></ngx-zen-dialog>

<ng-template #customPrimaryButton>
  <ngx-zen-button text="Confirm"></ngx-zen-button>
</ng-template>

<ng-template #customSecondaryButton>
  <ngx-zen-button text="Cancel" variant="outlined"></ngx-zen-button>
</ng-template>
  \`\`\``,
      title: 'With custom button templates',
    },
  ];
}
