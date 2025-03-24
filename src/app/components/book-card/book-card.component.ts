import { Component } from '@angular/core';
import { BookItem } from '../../books.service';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-book-card',
  imports: [TableModule, ButtonModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {
  bookItem: BookItem | null = null;
  headers: Array<string> = ['Автор', 'Страницы', 'Язык', 'Жанр'];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedBook = localStorage.getItem('selectedBook');
    if (storedBook) {
      this.bookItem = JSON.parse(storedBook);
    } else {
      this.router.navigate(['books']);
    }
  }

  navigateToBookList(): void {
    localStorage.removeItem('selectedBook');
    this.router.navigate(['books']);
  }
}
