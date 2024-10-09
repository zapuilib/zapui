import { Component } from '@angular/core';

@Component({
  selector: 'ngx-zen-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  isOpen = false;

  toggleAccordion() {
    this.isOpen = !this.isOpen;
  }
}
