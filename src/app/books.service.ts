import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface BookItem {
  id: number,
  name: string, 
  author: string, 
  pages: number, 
  language: string, 
  genre: string, 
  description: string
}

@Injectable({
  providedIn: 'root'
})

export class BooksService {

  private apiUrl = 'https://run.mocky.io/v3/61ffb6d0-5459-4777-9a0c-427618216cb3'; 

  constructor(private http: HttpClient) {}

  getBooksList(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
