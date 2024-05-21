import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { env as environment } from '../enviornments/env';
import * as models from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class MovieServices {
  private baseUrl = `${environment.apiBaseUrl}/movie`
  constructor(private http: HttpClient) {
  }

  getMostViewed(n: number): Promise<any> {
    const url = `${this.baseUrl}/most-viewed/${n}`;
    return new Promise(resolve => (
      this.http.request<models.MovieInfo[]>("get", url)
        .subscribe({
          next: (response) => {resolve(response)},
          error: (error) => {alert(error)}})
    ));
  }
}