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
import { SelectComponent } from "../select/select.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule, ButtonModule, SelectComponent, CommonModule],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
})
export class BookFormComponent {
  form: FormGroup;
  authorsList: Array<string> = [];
  languagesList: Array<string> = [];

  constructor(private fb: FormBuilder, private booksService: BooksService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      pages: [null, [Validators.required, Validators.min(0)]],
      language: ['', Validators.required],
      genre: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.booksService.getBooksList().pipe(
      map((data) => {
        const bookInfo = data.record.data.map((book: BookItem) => ({
          author: book.author,
          language: book.language,
        }));
  
        return {
          uniqueAuthors: [...new Set(bookInfo.map((item: {author: string}) => item.author))],
          uniqueLanguages: [...new Set(bookInfo.map((item: {language: string}) => item.language))],
        };
      })
    )
    .subscribe(({ uniqueAuthors, uniqueLanguages }) => {
      this.authorsList = uniqueAuthors as Array<string>;
      this.languagesList = uniqueLanguages as Array<string>;
    });
  }

  onSubmit(value: BookItem) {
    console.log(value);
  }
}
