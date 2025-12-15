import { Component } from '@angular/core';
import { ZapTooltip, ZapTooltipHandler, ZapTooltipContent } from 'zap';

import { TitleComponent } from '../../components/title/title.component';
import { SpacerComponent } from '../../components/spacer/spacer.component';

@Component({
  selector: 'app-colors',
  imports: [TitleComponent, SpacerComponent, ZapTooltip, ZapTooltipHandler, ZapTooltipContent],
  templateUrl: './colors.component.html',
  styleUrl: './colors.component.scss',
})
export class ColorsComponent {
  // Define dark theme colors using hex codes directly
  darkThemeColors = [
    { bgColor: '#09090B', textColor: '#FFFFFF', label: 'Primary' },
    { bgColor: '#FFFFFF', textColor: '#09090B', label: 'Secondary' },
    { bgColor: '#FFFFFF', textColor: '#09090B', label: 'Tertiary' },
    { bgColor: '#22c55e', textColor: '#09090B', label: 'Success' },
    { bgColor: '#eab308', textColor: '#09090B', label: 'Warning' },
    { bgColor: '#dc2626', textColor: '#FFFFFF', label: 'Error' },
    { bgColor: '#2563eb', textColor: '#FFFFFF', label: 'Info' },
    { bgColor: '#09090B', textColor: '#FFFFFF', label: 'Success Text' },
    { bgColor: '#09090B', textColor: '#FFFFFF', label: 'Warning Text' },
    { bgColor: '#FFFFFF', textColor: '#09090B', label: 'Error Text' },
    { bgColor: '#FFFFFF', textColor: '#09090B', label: 'Info Text' },
  ];

  // Define light theme colors using hex codes directly
  lightThemeColors = [
    { bgColor: '#FFFFFF', textColor: '#09090B', label: 'Primary' },
    { bgColor: '#09090B', textColor: '#FFFFFF', label: 'Secondary' },
    { bgColor: '#09090B', textColor: '#FFFFFF', label: 'Tertiary' },
    { bgColor: '#22c55e', textColor: '#09090B', label: 'Success' },
    { bgColor: '#eab308', textColor: '#09090B', label: 'Warning' },
    { bgColor: '#dc2626', textColor: '#FFFFFF', label: 'Error' },
    { bgColor: '#2563eb', textColor: '#FFFFFF', label: 'Info' },
    { bgColor: '#09090B', textColor: '#FFFFFF', label: 'Success Text' },
    { bgColor: '#09090B', textColor: '#FFFFFF', label: 'Warning Text' },
    { bgColor: '#FFFFFF', textColor: '#09090B', label: 'Error Text' },
    { bgColor: '#FFFFFF', textColor: '#09090B', label: 'Info Text' },
  ];
}
