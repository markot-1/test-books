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

  private apiUrl = 'https://api.jsonbin.io/v3/b/67dec4978561e97a50f0d1b1'; 

  constructor(private http: HttpClient) {}

  getBooksList(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
