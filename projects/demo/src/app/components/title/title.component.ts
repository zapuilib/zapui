import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'ttl',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit, AfterViewInit {
  @Input() type: 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h2';
  @Input() text!: string;
  id: string = '';

  ngOnInit(): void {
    this.id = this.text.toLowerCase().replace(/ /g, '-');
    if (typeof window !== 'undefined' && window.location.hash.substring(1) === this.id) {
      setTimeout(() => {
        this.scrollToElement(this.id);
      }, 100);
    }
  }

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', () => {
        if (window.location.hash.substring(1) === this.id) {
          this.scrollToElement(this.id);
        }
      });
    }
  }

  copyLink(id: string) {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      navigator.clipboard
        .writeText(url)
        .then(() => {
          this.navigateTo(id);
        })
        .catch((err) => console.error('Error copying link:', err));
    }
  }

  navigateTo(id: string) {
    if (typeof window !== 'undefined') {
      const url = `${window.location.pathname}#${id}`;
      history.replaceState(null, '', url);
    }
    this.scrollToElement(id);
  }

  scrollToElement(id: string) {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}
