import { Component, ViewChild } from '@angular/core';
import { BookItem, BooksService } from '../../books.service';
import { Table, TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { FilterService } from 'primeng/api';

@Component({
  selector: 'app-books-list',
  imports: [TableModule, InputTextModule, ButtonModule, MultiSelectModule, FormsModule, SelectModule],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.scss',
  providers: [FilterService]
})
export class BooksListComponent {
  @ViewChild('table') table!: Table;
  booksList: BookItem[] = [];
  headers: Array<string> = ['Название', 'Автор', 'Страницы', 'Язык', 'Жанр'];
  uniqueGenres: { label: string; value: string }[] = [];
  selectedGenre: string = '';

  uniqueAuthors: { label: string; value: string }[] = [];
  selectedAuthors: string[] = [];

  uniqueLanguages: { label: string; value: string }[] = [];
  selectedLanguages: string[] = [];

  minPages: number | null = null;
  maxPages: number | null = null;
  

  constructor(private booksService: BooksService, private router: Router, private filterService: FilterService) {}

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

  ngAfterViewChecked() {
    this.filterService.register('customPageFilter', (value: string, filter: string): boolean => {
      const [min, max] = filter.split('-').map(val => parseInt(val.trim(), 10));
      const pages = parseInt(value, 10);
      return (!min || pages >= min) && (!max || pages <= max);
    });
  }

  applyPageFilter() {
    if (this.table) {
      const filterValue = `${this.minPages || ''}-${this.maxPages || ''}`;
      this.table.filter(filterValue, 'pages', 'customPageFilter');
    }
  }

  navigateToBookCard(book: BookItem): void {
    localStorage.setItem('selectedBook', JSON.stringify(book));
    this.router.navigate(['book', book.id]);
  }

  navigateToBookForm(): void {
    this.router.navigate(['form']);
  }
}
