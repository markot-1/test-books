import { Component } from '@angular/core';
import { BookItem, BooksService } from '../../books.service';

@Component({
  selector: 'app-books-list',
  imports: [],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss'
})
export class BooksListComponent {
  booksList: BookItem[] = [];

  constructor(private booksService: BooksService) {}

  ngOnInit():void {
    this.booksService.getBooksList().subscribe((data) => {
      this.booksList = data.data;
    });
  }
}
