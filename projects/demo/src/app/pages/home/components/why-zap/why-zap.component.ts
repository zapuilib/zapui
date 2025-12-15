import { Component } from '@angular/core';

@Component({
  selector: 'home-why-zap',
  imports: [],
  templateUrl: './why-zap.component.html',
  styleUrl: './why-zap.component.scss',
})
export class HomeWhyZapComponent {
  cards: any[] = [
    {
      svg: 'assets/home/fast-shape.svg',
      title: `It's fast`,
      description:
        'Get started in minutes with our simple three-step setup: install the package, initialize the library, and begin crafting your UI',
    },
    {
      svg: 'assets/home/flexible-shape.svg',
      title: `It's flexible`,
      description:
        'Every component is designed with customization in mind. From global themes to individual component settings, you have complete control over the look and behavior of your UI',
    },
    {
      svg: 'assets/home/free-shape.svg',
      title: `It's free`,
      description:
        'Zap UI is open-source and free forever. Use it in personal or commercial projects without any restrictions',
    },
  ];

  onMouseMove(e: MouseEvent, element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const gradientElement = element.querySelector('.gradient') as HTMLElement;
    if (gradientElement) {
      gradientElement.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(246, 55, 227, 0.2), transparent 40%)`;
    }
  }

  onMouseLeave(e: MouseEvent, element: HTMLElement) {
    const gradientElement = element.querySelector('.gradient') as HTMLElement;
    if (gradientElement) {
      gradientElement.style.background = 'none';
    }
  }
}
