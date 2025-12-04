import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ZapPagination,
  ZapPaginationItem,
  ZapPaginationLink,
  ZapPaginationPrevious,
  ZapPaginationNext,
  ZapPaginationEllipsis,
} from 'zap';

@Component({
  selector: 'app-pagination',
  imports: [
    CommonModule,
    ZapPagination,
    ZapPaginationItem,
    ZapPaginationLink,
    ZapPaginationPrevious,
    ZapPaginationNext,
    ZapPaginationEllipsis,
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  currentPage = 1;
  totalPages = 10;

  onPageClick(page: number): void {
    this.currentPage = page;
    console.log('Page clicked:', page);
  }

  onPreviousClick(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      console.log('Previous clicked, current page:', this.currentPage);
    }
  }

  onNextClick(): void {
    console.log('onNextClick called, currentPage before:', this.currentPage);
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      console.log('Next clicked, current page after:', this.currentPage);
    }
  }

  getPages(): (number | 'ellipsis')[] {
    const pages: (number | 'ellipsis')[] = [];
    const total = this.totalPages;
    const current = this.currentPage;

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (current <= 3) {
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(total);
      } else if (current >= total - 2) {
        pages.push('ellipsis');
        for (let i = total - 3; i <= total; i++) {
          pages.push(i);
        }
      } else {
        pages.push('ellipsis');
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(total);
      }
    }

    return pages;
  }
}
