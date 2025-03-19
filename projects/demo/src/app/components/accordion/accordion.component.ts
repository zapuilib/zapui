import { Component } from '@angular/core';
import {
  ZapAccordionContent,
  ZapAccordionGroup,
  ZapAccordionHeader,
  ZapAccordionItem,
} from 'zap/core';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [ZapAccordionGroup, ZapAccordionHeader, ZapAccordionContent, ZapAccordionItem],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent {
  accordions = [
    {
      title: 'Accordion 1',
      content: 'Content for Accordion 1',
    },
    {
      title: 'Accordion 2',
      content: 'Content for Accordion 2',
    },
    {
      title: 'Accordion 3',
      content: 'Content for Accordion 3',
    },
  ];
}
