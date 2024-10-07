import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  markdowns = [
    {
      markdown: `\`\`\`html
<ngx-zen-modal>
  <div class="content">
    <p class="text-lg mb-3">
      Lorem ipsum dolor sit amet
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris
      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat
      nulla pariatur. Excepteur sint occaecat cupidatat non proident,
      sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </div>
</ngx-zen-modal>
  \`\`\``,
      title: 'Basic modal',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-modal shape="curve">
  <div class="content">
    <p class="text-lg mb-3">
      Lorem ipsum dolor sit amet
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris
      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat
      nulla pariatur. Excepteur sint occaecat cupidatat non proident,
      sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </div>
</ngx-zen-modal>
  \`\`\``,
      title: 'Curve modal',
    },
    {
      markdown: `\`\`\`html
<ngx-zen-modal shape="curve" size="small">
  <div class="content">
    <p class="text-lg mb-3">
      Lorem ipsum dolor sit amet
    </p>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
      enim ad minim veniam, quis nostrud exercitation ullamco laboris
      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat
      nulla pariatur. Excepteur sint occaecat cupidatat non proident,
      sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>
  </div>
</ngx-zen-modal>
  \`\`\``,
      title: 'Small modal',
    },
  ];
}
