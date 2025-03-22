import { Component } from '@angular/core';
import { BookItem } from '../../books.service';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-book-card',
  imports: [TableModule],
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
}
