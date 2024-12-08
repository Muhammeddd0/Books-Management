import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private apiUrl  = 'https://dummyjson.com/products'

    constructor(private _httpClient: HttpClient) { }


    getBooks(): Observable<any> {
      return this._httpClient.get(this.apiUrl);
    }
  
    addBook(bookData: any): Observable<any> {
      return this._httpClient.post(`${this.apiUrl}/add`, bookData);
    }
  
    getBookById(id: string): Observable<any> {
      return this._httpClient.get(`${this.apiUrl}/${id}`);
    }
  
    updateBook(id: string, bookData: any): Observable<any> {
      return this._httpClient.put(`${this.apiUrl}/${id}`, bookData);
    }
  
    deleteBook(id: string ): Observable<any> {
      return this._httpClient.delete(`${this.apiUrl}/${id}` );
    }

}
