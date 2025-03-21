import { Component } from '@angular/core';
import { BookItem, BooksService } from '../../books.service';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-list',
  imports: [TableModule],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss',
})
export class BooksListComponent {
  booksList: BookItem[] = [];
  headers: Array<string> = ['Название', 'Автор', 'Страницы', 'Язык', 'Жанр'];

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.booksService.getBooksList().subscribe((data) => {
      this.booksList = data.data;
    });
  }

  navigateToBookCard(id: number):void {
    this.router.navigate(['book', id]);
  }
}
