import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface BookItem {
  id: number,
  name: string, 
  author: string, 
  pages: number, 
  language: string, 
  genre: string, 
  description?: string
}

@Injectable({
  providedIn: 'root'
})

export class BooksService {

  private apiUrl = 'https://api.jsonbin.io/v3/b/67dec4978561e97a50f0d1b1'; 
  private apiKey = '$2a$10$R/dsxw9uMGjR80a5NChQSepitV7WyfuEwA1Fu3U2JQgC8qGTl9WVS'; 

  constructor(private http: HttpClient) {}

  getBooksList(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  updateBooksList(newBooksList: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Master-Key': this.apiKey, 
    });

    return this.http.put(this.apiUrl, { data: newBooksList }, { headers });
  }
}
