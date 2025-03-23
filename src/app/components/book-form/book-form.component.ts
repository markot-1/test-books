import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { BookItem, BooksService } from '../../books.service';
import { map } from 'rxjs';
import { SelectComponent } from '../select/select.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule, ButtonModule, SelectComponent, CommonModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
})
export class BookFormComponent {
  form: FormGroup;
  booksList: BookItem[] = [];
  authorsList: Array<string> = [];
  languagesList: Array<string> = [];

  constructor(
    private fb: FormBuilder,
    private booksService: BooksService,
    private router: Router
  ) {
    this.form = this.fb.group({
      id: [null, Validators.required],
      name: ['', Validators.required],
      author: ['', Validators.required],
      pages: [null, [Validators.required, Validators.min(0)]],
      language: ['', Validators.required],
      genre: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.booksService
      .getBooksList()
      .pipe(
        map((data) => {
          this.booksList = data.record.data;
          const bookInfo = data.record.data.map((book: BookItem) => ({
            author: book.author,
            language: book.language,
          }));

          return {
            uniqueAuthors: [
              ...new Set(
                bookInfo.map((item: { author: string }) => item.author)
              ),
            ],
            uniqueLanguages: [
              ...new Set(
                bookInfo.map((item: { language: string }) => item.language)
              ),
            ],
          };
        })
      )
      .subscribe(({ uniqueAuthors, uniqueLanguages }) => {
        this.authorsList = uniqueAuthors as Array<string>;
        this.languagesList = uniqueLanguages as Array<string>;
        this.form.patchValue({ id: this.booksList.length + 1 });
      });
  }

  onSubmit(value: BookItem) {
    this.booksList = [...this.booksList, value];
    this.booksService.updateBooksList(this.booksList);
    this.router.navigate(['books']);
  }
}
