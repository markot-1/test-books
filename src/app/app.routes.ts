import { Routes } from '@angular/router';
import { BooksListComponent } from './components/books-list/books-list.component';
import { BookCardComponent } from './components/book-card/book-card.component';

export const routes: Routes = [
    {path: 'books', title: 'Test task', component: BooksListComponent},
    {path: 'book/:id', title: 'Test task | book card', component: BookCardComponent },
    {path: '', redirectTo: 'books', pathMatch: 'full'},
];
