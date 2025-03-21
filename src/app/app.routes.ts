import { Routes } from '@angular/router';
import { BooksListComponent } from './components/books-list/books-list.component';

export const routes: Routes = [
    {path: 'books', component: BooksListComponent},
    {path: '', redirectTo: 'books', pathMatch: 'full'}
];
