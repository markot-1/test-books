import { Routes } from '@angular/router';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BookFormComponent } from './components/book-form/book-form.component';

export const routes: Routes = [
    {path: 'books', title: 'Test task', component: BooksListComponent},
    {path: 'book/:id', title: 'Test task | book card', component: BookCardComponent },
    {path: 'form', title: 'Test task | book form', component: BookFormComponent },
    {path: '', redirectTo: 'books', pathMatch: 'full'},
];
