import { Component } from '@angular/core';
import {
  ZapAccordionContent,
  ZapAccordionGroup,
  ZapAccordionHeader,
  ZapAccordionItem,
} from 'zap/core';

@Component({
  selector: 'app-accordion',
  imports: [ZapAccordionGroup, ZapAccordionHeader, ZapAccordionContent, ZapAccordionItem],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
})
export class AccordionComponent {
  accordions = [
    {
      title: 'Accordion 1',
      content: 'Content for Accordion 1',
      open: true,
    },
    {
      title: 'Accordion 2',
      content: 'Content for Accordion 2',
      open: false,
    },
    {
      title: 'Accordion 3',
      content: 'Content for Accordion 3',
      open: false,
    },
  ];

  multipleAccordions = [
    {
      title: 'Multiple Accordion 1',
      content: 'This is open by default in multiple mode',
      open: true,
    },
    {
      title: 'Multiple Accordion 2',
      content: 'This is also open by default in multiple mode',
      open: true,
    },
    {
      title: 'Multiple Accordion 3',
      content: 'This is closed by default',
      open: false,
    },
  ];
}
