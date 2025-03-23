import { Component } from '@angular/core';
import { BookItem, BooksService } from '../../books.service';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { SelectComponent } from "../select/select.component";

@Component({
  selector: 'app-books-list',
  imports: [TableModule, InputTextModule, ButtonModule, MultiSelectModule, FormsModule, SelectModule],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss',
})
export class BooksListComponent {
  booksList: BookItem[] = [];
  headers: Array<string> = ['Название', 'Автор', 'Страницы', 'Язык', 'Жанр'];
  uniqueGenres: { label: string; value: string }[] = [];
  selectedGenre: string = '';

  uniqueAuthors: { label: string; value: string }[] = [];
  selectedAuthors: string[] = [];

  uniqueLanguages: { label: string; value: string }[] = [];
  selectedLanguages: string[] = [];

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit(): void {
    this.booksService.getBooksList().subscribe((data) => {
      this.booksList = data.record.data;

      this.uniqueGenres = [
        ...new Set(this.booksList.map((book) => book.genre))
      ].map((genre) => ({ label: genre, value: genre }));

      this.uniqueAuthors = [
        ...new Set(this.booksList.map((book) => book.author))
      ].map((author) => ({ label: author, value: author }));

      this.uniqueLanguages = [
        ...new Set(this.booksList.map((book) => book.language))
      ].map((language) => ({ label: language, value: language }));
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
