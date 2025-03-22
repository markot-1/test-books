import { Component } from '@angular/core';
import { BookItem, BooksService } from '../../books.service';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-books-list',
  imports: [TableModule, InputTextModule, ButtonModule],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss',
})
export class BooksListComponent {
  booksList: BookItem[] = [];
  headers: Array<string> = ['Название', 'Автор', 'Страницы', 'Язык', 'Жанр'];

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.booksService.getBooksList().subscribe((data) => {
      this.booksList = data.record.data;
    });
  }

  navigateToBookCard(book: BookItem): void {
    localStorage.setItem('selectedBook', JSON.stringify(book));
    this.router.navigate(['book', book.id]);
  }

  navigateToBookForm(): void {
    this.router.navigate(['form']);
  }
}
